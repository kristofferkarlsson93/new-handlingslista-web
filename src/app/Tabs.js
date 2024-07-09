import React, { useState } from 'react';

export const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState(props.children[0].props.label)
  const buttons = props.children.map(tab => tab.props.label);
  return (
     <div>
       <TabButtons activeTab={activeTab} buttons={buttons} changeTab={(tab) => setActiveTab(tab)}/>
       {React.Children.map(props.children, child =>{
         if (child.props.label === activeTab) {
           return child;
         }
       })}
     </div>
  );
}

const TabButtons = ({buttons, changeTab, activeTab}) =>{

  return(
     <div className="tab-buttons">
       {buttons.map((button) =>{
         return <button
            className={button === activeTab? 'tab-button-active tab-button': 'tab-button'}
            onClick={()=>changeTab(button)}
            key={button}
         >{button}</button>
       })}
     </div>
  )
}

export const Tab = props => {
  return (
     <React.Fragment>
       {props.children}
     </React.Fragment>
  )
}