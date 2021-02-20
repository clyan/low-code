import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
const { Option } = Select;
export default function PropertyAjust (props: any) {
    const { config, onSave, defaultValues} =  props;
    const [form] = Form.useForm();
    const handlechange = () => {
        onSave && onSave(form.getFieldsValue());
    }
    form.setFieldsValue(defaultValues);
    return (
        <div className="propertyAjustWrapper">
            <Form
                form={form}
                name={`form_editor`}
                onValuesChange={handlechange}
                onFinish={onSave}
                >
                {config ? (config.map((item: any, i:number) => {
                    return (
                    <React.Fragment key={ i }>
                        {item.type === 'Text' && (
                            <Form.Item label={item.name}  name={item.key}>
                                <Input />
                            </Form.Item>
                        )}
                        {item.type === 'Input' && (
                            <Form.Item label={item.name} name={item.key}>
                                <Input />
                            </Form.Item>
                        )}
                        {item.type === 'ImgUrl' && (
                            <Form.Item label={item.name} name={item.key}>
                               <Input />
                            </Form.Item>
                        )}
                        {item.type === 'Number' && (
                            <Form.Item label={item.name} name={item.key}>
                                <InputNumber />
                            </Form.Item>
                        )}
                        {item.type === 'Select' && (
                        <Form.Item label={item.name} name={item.key}>
                            <Select placeholder="请选择">
                            {item.range.map((v: any, i: number) => {
                                return (
                                    <Option value={v.key} key={i}>
                                        {v.text}
                                    </Option>
                                );
                            })}
                            </Select>
                        </Form.Item>
                        )}
                    </React.Fragment>
                    );
                })): '暂无信息'}
                
                </Form>
        </div>
    )
}