import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {EditableSpan} from '../components/EditableSpan';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'EditableSpan Component',
  component: EditableSpan,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
} as ComponentMeta<typeof EditableSpan>;
const changeCallback = action("Edit title of Span")
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const EditableSpanBase: ComponentStory<typeof EditableSpan> = (props:any) => <EditableSpan title={'Start value'} callback={changeCallback} />;

