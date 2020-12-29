import React, { FC, useEffect, useState } from 'react';
import Flex from '@chakra-ui/core/dist/Flex';
import Input from '@chakra-ui/core/dist/Input';
import Tag, { TagCloseButton, TagLabel } from '@chakra-ui/core/dist/Tag';
import { Dropdown } from '../../atoms'
import { GrClear } from 'react-icons/gr'
import Box from '@chakra-ui/core/dist/Box';
import { Tooltip } from '@chakra-ui/core';

type Props = {
  placeholder?: string,
  options?: string[], // options to choose from
  selectedOptions: string[], // currently selected options
  onChange: (selectedItems: string[]) => void,
  mode?: "dropdown" | "input"
}

export const MultiSelect: FC<Props> = ({
  placeholder = '',
  options = [],
  selectedOptions = [],
  onChange,
  mode = 'input'
}) => {
  const [state, setState] = useState({
    value: "",
    selectedOptions: selectedOptions
  });

  /**
   * Updates the appropriate state prop by its field name from the
   * form where 'name' is a prop on the target component
   */
  const updateField = (event) => {
    const target = event.target;
    const value = target?.type === 'checkbox' ? target.checked : target?.value || '';
    const name = target?.name || '';
    setState({ ...state, [name]: value })
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      addOption(state.value.trim())
    }
  };

  const addOption = (nextOption = null) => {
    if (!nextOption) return

    let newOptions = [...state.selectedOptions, nextOption];
    // Merge in the new option
    setState({
      ...state,
      value: '',
      selectedOptions: newOptions
    });

    // Run whatever should happen when options array is updated
    onChange(newOptions);
  }

  const clear = () => {

    setState({
      ...state,
      selectedOptions: []
    });

    onChange([])
  }

  return (
    <Flex
      m={[1, 1]}
      direction="column"
    // p={4}
    // style={{ border: '2px solid red' }}
    >
      <Flex wrap='wrap'>
        {state.selectedOptions.map((option, index) =>
          <Tag
            key={index}
            size='sm'
            borderRadius="full"
            variant="solid"
            color="white"
          // backgroundColor="green" // Transparent!!
          >
            <TagLabel>{option}</TagLabel>
            <TagCloseButton

              onClick={
                () => {
                  let remainingOptions = state.selectedOptions
                    .slice(0, index)
                    .concat(state.selectedOptions.slice(index + 1, state.selectedOptions.length));

                  setState({
                    ...state,
                    selectedOptions: remainingOptions,
                    value: '',
                  });

                  onChange(remainingOptions)
                }
              }
            />
          </Tag>
        )}

        {state.selectedOptions.length > 0 &&
          <Box
            m={[1, 1]}
            alignSelf='center'
          >
            <Tooltip
              label="Clear Paper Categories"
              aria-label='clear-tip'
            >
              <GrClear
                onClick={clear}
              />
            </Tooltip>
          </Box>}
      </Flex>


      {
        mode === 'input' &&
        <Input
          margin={1}
          type='text'
          placeholder={placeholder
            || selectedOptions[0]
            || options[0]
            || ''}
          value={state.value}
          name='value'
          onChange={updateField}
          onKeyDown={onKeyDown}
        ></Input>
      }

      {
        mode === 'dropdown' &&
        <Dropdown
          // margin={1}
          placeholder={placeholder
            || selectedOptions[0]
            || options[0]
            || ''}
          options={options}
          onChange={(selected) => {
            if (!selected)
              return
            let newOptions = [...new Set([...state.selectedOptions, selected])];

            // Merge in the new option
            setState({
              ...state,
              selectedOptions: newOptions
            });

            onChange(newOptions)
          }}
          initial={state.value}
          name="value"
        />
      }

    </Flex>

  );
};

export default MultiSelect;