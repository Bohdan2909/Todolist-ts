import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from '../components/TodolistWithRedux';
import {action} from '@storybook/addon-actions';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Task Component',
  component: Task,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
} as ComponentMeta<typeof Task>;
const removeTaskCallback = action("Task removed")
const changeTaskStatusCallback = action("Task changed")
const updateTitleTaskHandlerCallback = action("Title of task is updated")
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskBase: ComponentStory<typeof Task> = (props:any) => {
  return <>
    <Task task={{id:'1',isDone:true,title:"Css"}}
          todolistId={'todolistId1'}
          removeTask={removeTaskCallback}
          changeTaskStatus={changeTaskStatusCallback}
          updateTitleTaskHandler={updateTitleTaskHandlerCallback}/>
    <Task task={{id:'2',isDone:false,title:"Html"}}
          todolistId={'todolistId2'}
          removeTask={removeTaskCallback}
          changeTaskStatus={changeTaskStatusCallback}
          updateTitleTaskHandler={updateTitleTaskHandlerCallback}/>
  </>
};
//На основі template новий метод
// const Template:ComponentStory<typeof Task=(args)=><Task {...args}/>
//
// export const TaskStory=Template.bind({})
// TaskStory.args={
//   removeTaskCallback: action("Task removed"),
//   changeTaskStatusCallback: action("Task changed"),
//   updateTitleTaskHandlerCallback: action("Title of task is updated"),
//   task:{id:'1',isDone:true,title:"Css"},
//   todolistId:{'todolistId1'}
// }

