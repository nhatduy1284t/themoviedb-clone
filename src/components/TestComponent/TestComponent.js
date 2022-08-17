import { Switch } from 'antd';
import React from 'react'

export default function TestComponent() {
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
      };
  return (
    <div className='container mx-auto'>
        <Switch defaultChecked onChange={onChange} />
    </div>
    
  )
}
