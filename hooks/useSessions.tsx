import { checkoutSession, saveSession, updateSession } from '../stores/sessionsAPI';
import { CheckoutStatus } from '../constants/CheckoutStatus';
import { createContext, useContext, useState } from 'react';
import { Session } from '../models/Session';
import Router from 'next/router';
import { useAuth, useWordpress } from 'hooks';
import { Paper } from 'models';

const context = createContext(null);

/**
 * Hook
 */
export const useSessions = () => {
    return useContext(context);
}

/**
 * Provider HOC
 */
export const ProvideSessions = ({ children }) => {
    const sessions = useSessionProvider();
    return (
        <context.Provider value={sessions}>{children}</context.Provider>
    )
}

export enum Actions {
    Update = 'Update',
    Save = 'Save',
    Publish = 'Publish',
    Status = "Status",
    New = "New"
}

/**
 * Loads the API
 */
function useSessionProvider() {

    const [session, setSession] = useState(Session.create({}));
    const { user } = useAuth();
    const { publish } = useWordpress();

    const updatePaper = async (doc: string, session: Session) => {
        session.status = CheckoutStatus.CheckedOut
        await updateSession(doc as string, session)
    }

    const savePaper = async (session: Session) => {

        // Have the hook perform the actual save:
        if (!session) {
            console.warn('Null session');
            return;
        }

        if (status === CheckoutStatus.FirstDraft || status === CheckoutStatus.Published) {
            return null;
        }

        if (status == CheckoutStatus.NotStarted) {
            session.date_uploaded = new Date();
        }

        let id = await saveSession(session);

        if (!!id) {
            await checkoutSession(id)
            Router.push('/scribe/edit/[doc]', `/scribe/edit/${id}`)
        }

        return id;
    }

    const publishPaper = async (doc: string, session: Session) => {

        let code = `<p>test</p>`

        // Publish a Paper {New | Existing} to Wordpress and send the updated Session to Firebase:

        let paper = new Paper({ content: code, author: 9 });

        publish(paper)
            .then(async (response) => {
                // console.log('response :>> ', response);

                if (!response.id) {
                    console.warn('Nothing came back from Wordpress');
                    return
                }

                let sessionUpdate = {
                    authorId: response.author || null,
                    paperId: response.id,

                    date_modified: response.modified,
                    status: CheckoutStatus.FirstDraft,
                    contributors: [user.email], //TODO: push and filter dups
                    code: response.content ? response.content.rendered : '',
                    original: '',
                    excerpt: '',
                    title: session.title,
                };

                // FYI:  This is a one-way street and it assumes we're not going to perform update()s,
                // at least for now.  Only way we can do proper updates is if we prevent users from committing the same draft.
                // We have Sessions checked-out state as a stopgap

                await updateSession(doc as string, sessionUpdate)

            })
    }

    return {
        updatePaper,
        savePaper,
        publishPaper,

        session,
        setSession,
    }
}