import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from '../components/AddItemForm';
import {action} from '@storybook/addon-actions'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'AddItemForm Component',
  component: AddItemForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
addItem:{
  description:'Button clicked'
}
  },
} as ComponentMeta<typeof AddItemForm>;
const callback = action("Button add was pressed inside the form")
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormBase: ComponentStory<typeof AddItemForm> = (props:any) => <AddItemForm addItem={callback} />;

const callback1 = action("Button add was pressed inside the form")
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormDisabledBase: ComponentStory<typeof AddItemForm> = (props:any) => <AddItemForm addItem={callback1} disabled={true} />;

