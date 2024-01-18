import { Alert, Space, Spin } from 'antd';

function SpinnerComponent(){
    return(
        <div className='spinnerComp'>
        <Space
        direction="vertical"
        style={{
        width: '100%',
        }}
        >
  
     <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
   

    </Space>
        </div>
    )
}


export default SpinnerComponent