import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AppWithRedux from '../AppWithRedux';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'AppWithRedux Component',
  component: AppWithRedux,
  decorators:[ReduxStoreProviderDecorator],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
} as ComponentMeta<typeof AppWithRedux>;
// const removeTaskCallback = action("Task removed")
// const changeTaskStatusCallback = action("Task changed")
// const updateTitleTaskHandlerCallback = action("Title of task is updated")
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AppWithReduxBase: ComponentStory<typeof AppWithRedux> = (props:any) => {
  return <>

    <AppWithRedux demo={true}/>

  </>
};

