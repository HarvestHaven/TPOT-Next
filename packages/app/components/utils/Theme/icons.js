import theme from '@chakra-ui/core/dist/theme'

export default {
  icons: {
    ...theme.icons,
    ribbon: {
      path: (
        <>
          <path
            fill='currentColor'
            d='M3.95,13.908L0.125,21.5l5.434-1.358L8,24l2.94-6.058C8.074,17.639,5.575,16.115,3.95,13.908 z'
          />
          <path
            fill='currentColor'
            d='M20.05,13.908l3.825,7.592l-5.434-1.358L16,24l-2.94-6.058 C15.926,17.639,18.425,16.115,20.05,13.908z'
          />
          <path
            fill='currentColor'
            d='M12,0C7.589,0,4,3.589,4,8s3.589,8,8,8s8-3.589,8-8S16.411,0,12,0z M12,10c-1.105,0-2-0.895-2-2 c0-1.105,0.895-2,2-2s2,0.895,2,2C14,9.105,13.105,10,12,10z'
          />
        </>
      ),
      viewBox: '0 0 24 24',
    },
    scribe: {
      path: (
        <path
          fill='currentColor'
          d='M3.3 13.5c-.2 2-.3 3.9-.3 5.9L.3 22.1c-.4.4-.4 1.2 0 1.6.4.4 1.2.4 1.6 0L4.6 21c2 0 4-.1 5.9-.3C22.2 19.5 23.8 2.4 24 0 21.6.2 4.5 1.8 3.3 13.5zm7 4.9l-3.3.3 2.2-2.2H15c-1.3 1-2.9 1.7-4.7 1.9zm6.2-3.4h-5.9l3-3h5c-.6 1.1-1.3 2.1-2.1 3zm-1.4-4.5l.6-.6c.4-.4.4-1.2 0-1.6-.4-.4-1.2-.4-1.6 0l-8.8 8.8c.1-1.1.1-2.3.3-3.4.8-7.9 10.8-10.4 15.8-11.1-.3 2.1-1 5.1-2.2 7.9h-4.1z'
        />
      ),
      viewBox: '0 0 24 24',
    },
    settings: {
      path: (
        <g fill='currentColor' stroke='currentColor'>
          <path
            fill='none'
            stroke='currentColor'
            d='M23,14v-4h-3.262 c-0.189-0.732-0.477-1.422-0.852-2.058l2.306-2.306l-2.828-2.828l-2.306,2.306C15.422,4.739,14.732,4.451,14,4.262V1h-4v3.262 C9.268,4.451,8.578,4.739,7.942,5.114L5.636,2.808L2.808,5.636l2.306,2.306C4.739,8.578,4.451,9.268,4.262,10H1v4h3.262 c0.189,0.732,0.477,1.422,0.852,2.058l-2.306,2.306l2.828,2.828l2.306-2.306c0.635,0.375,1.326,0.663,2.058,0.852V23h4v-3.262 c0.732-0.189,1.422-0.477,2.058-0.852l2.306,2.306l2.828-2.828l-2.306-2.306c0.375-0.635,0.663-1.326,0.852-2.058H23z'
          />
          <circle fill='none' cx='12' cy='12' r='3' />
        </g>
      ),
      viewBox: '0 0 24 24',
    },
    logout: {
      path: (
        <g fill='currentColor' stroke='currentColor' strokeLinecap='round' strokeWidth='2'>
          <path
            d='M21,12V5H3 C1.895,5,1,4.105,1,3v17c0,1.657,1.343,3,3,3h17v-7'
            fill='none'
            stroke='currentColor'
          />
          <path
            d='M17,2V1H3 C1.895,1,1,1.895,1,3v0c0,1.105,0.895,2,2,2'
            fill='none'
            stroke='currentColor'
          />
          <path d='M23,16h-5 c-1.105,0-2-0.895-2-2l0,0c0-1.105,0.895-2,2-2h5V16z' fill='none' />
        </g>
      ),
      viewBox: '0 0 24 24',
    },
    save: {
      path: (
        <g>
          <path
            fill='#2D527C'
            d='M391.914,511.827H120.086c-8.829,0-15.99-7.159-15.99-15.99V300.631c0-8.831,7.16-15.99,15.99-15.99
		h271.827c8.829,0,15.99,7.159,15.99,15.99v195.207C407.903,504.669,400.745,511.827,391.914,511.827z M136.076,479.848h239.848
		V316.621H136.076V479.848z'
          />
          <path
            fill='#2D527C'
            d='M202.168,376.456h-82.081c-8.829,0-15.99-7.159-15.99-15.99s7.16-15.99,15.99-15.99h82.081
		c8.829,0,15.99,7.159,15.99,15.99S210.999,376.456,202.168,376.456z'
          />
          <path
            fill='#2D527C'
            d='M287.979,443.612H120.086c-8.829,0-15.99-7.159-15.99-15.99c0-8.831,7.16-15.99,15.99-15.99h167.893
		c8.829,0,15.99,7.159,15.99,15.99C303.969,436.454,296.81,443.612,287.979,443.612z'
          />
        </g>
      ),
      viewBox: '0 0 24 24',
    },
    toolbox: {
      path: (
        <>
          <path
            fill='#E1EFFB'
            d='M4.6,5.6C5,6.2,5.3,6.9,5.3,7.6v4.3H8V7.6c0-0.7,0.2-1.4,0.7-1.9l1.6-2.1c0.2-0.3,0.2-0.6,0-0.9L8.5,0.1 C8.5,0,8.4,0,8.3,0H8C7.9,0,7.7,0.1,7.7,0.3v2.4c0,0.6-0.5,1.1-1.1,1.1h0C6,3.8,5.5,3.3,5.5,2.7c0-0.8,0-1.9,0-2.4 C5.5,0.1,5.4,0,5.2,0H5C4.9,0,4.8,0,4.7,0.1L3,2.6C2.8,2.9,2.8,3.2,3,3.5L4.6,5.6z'
          />
          <path
            fill='#BACED8'
            d='M10.2,2.6L8.5,0.1C8.5,0,8.4,0,8.3,0H8C7.9,0,7.9,0,7.8,0.1c0,1.1,0,2.6,0,3.2c0,0.2-0.1,0.4-0.2,0.5L6.2,5.6 C5.8,6.2,5.5,6.9,5.5,7.6v4.3H8V7.6c0-0.7,0.2-1.4,0.7-1.9l1.6-2.1C10.4,3.2,10.4,2.9,10.2,2.6z'
          />
          <path fill='#BACED8' d='M15.3,3h1.8v8.9h-1.8V3z' />
          <path
            fill='#E1EFFB'
            d='M20.7,0H20c-0.2,0-0.4,0.2-0.4,0.4c0,0.4-0.4,0.8-0.8,0.8h0c-0.4,0-0.8-0.4-0.8-0.8c0-0.2-0.2-0.4-0.4-0.4H16 c-2,0-3.7,1.7-3.7,3.7v1.7c0,0.1,0.1,0.2,0.2,0.2h0.3c0.4,0,0.8-0.3,0.9-0.6c0.1-0.4,0.5-0.6,0.9-0.6h3c0.2,0,0.4-0.2,0.4-0.4 c0-0.4,0.4-0.8,0.8-0.8h0c0.4,0,0.8,0.4,0.8,0.8c0,0.2,0.2,0.4,0.4,0.4h0.7c0.2,0,0.4-0.2,0.4-0.4V0.4C21.2,0.2,21,0,20.7,0z'
          />
          <path
            fill='#BACED8'
            d='M20.7,0H20c-0.2,0-0.4,0.2-0.4,0.4c0,0.4-0.4,0.8-0.8,0.8h0c0,0,0,0,0,0v1.9c0,0,0,0,0,0h0 c0.4,0,0.8,0.4,0.8,0.8c0,0.2,0.2,0.4,0.4,0.4h0.7c0.2,0,0.4-0.2,0.4-0.4V0.4C21.2,0.2,21,0,20.7,0z'
          />
          <path
            fill='#C69C6D'
            d='M22.9,24H1.1C0.5,24,0,23.5,0,22.9V11.7c0-0.6,0.5-1.1,1.1-1.1h21.7c0.6,0,1.1,0.5,1.1,1.1v11.1 C24,23.5,23.5,24,22.9,24z'
          />
          <path
            fill='#E1EFFB'
            d='M20.2,10.6v3.7c0,1.6-1.3,2.8-2.8,2.8H7.1c-1.6,0-2.8-1.3-2.8-2.8v-3.7H3.6v3.7c0,2,1.6,3.6,3.6,3.6h10.2 c2,0,3.6-1.6,3.6-3.6v-3.7H20.2z'
          />
          <path
            fill='#B28456'
            d='M22.9,10.6h-2.4c0.6,0,1.1,0.5,1.1,1.1V21c0,0.9-0.7,1.6-1.6,1.6H1.1c-0.6,0-1.1-0.5-1.1-1.1v1.4 C0,23.5,0.5,24,1.1,24h21.7c0.6,0,1.1-0.5,1.1-1.1V11.7C24,11.1,23.5,10.6,22.9,10.6z'
          />
          <path
            fill='#395F80'
            d='M15.9,18.5H8.6c-0.2,0-0.4-0.2-0.4-0.4v-0.9c0-0.2,0.2-0.4,0.4-0.4h7.3c0.2,0,0.4,0.2,0.4,0.4v0.9 C16.3,18.3,16.1,18.5,15.9,18.5z'
          />
          <path
            fill='#1D4859'
            d='M15.9,16.8h-2.2c0.1,0,0.1,0.1,0.1,0.1v1.5c0,0.1-0.1,0.1-0.1,0.1h2.2c0.2,0,0.4-0.2,0.4-0.4v-0.9 C16.3,16.9,16.1,16.8,15.9,16.8z'
          />
          <path
            fill='#E1EFFB'
            d='M6.6,7.5c-0.2,0-0.4,0.2-0.4,0.4v2.7H7V7.9C7,7.7,6.8,7.5,6.6,7.5z'
          />
        </>
      ),
      viewBox: '0 0 24 24',
    },
  },
}
