import tinycolor from 'tinycolor2';
import React, { useEffect, useState } from 'react';
import { Button, ColorPicker, Form, Input, Modal } from 'antd';
import TypeService from '../../../services/TypeService';

const EditCreateType = ({ isModalOpen, handleSubmit, handleCancel, initialValues, action }) => {
  const [form]                                  = Form.useForm();
  const [error, setError]                       = useState(null);
  const [loading, setLoading]                   = useState(false);
  let response;

  useEffect(() => {
    if (action==='Editar') form.setFieldsValue(initialValues);
    if (action==='Crear') form.resetFields();
  }, [isModalOpen, initialValues, form, action]);

  //Función para Convertir RGBA a Hexadecimal
  const rgbaToHex = (metaColor) => {
    const { r, g, b, a } = metaColor;
    return tinycolor({ r, g, b, a }).toHexString();
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = {
        ...values,
        color: rgbaToHex(values.color.metaColor),
      };
      if (action==='Editar') response = await TypeService.editType(initialValues.id, formData);
      if (action==='Crear') response = await TypeService.createType(formData);
    } catch (error) {
      setError(error);
    }finally {
      setLoading(false);
      if (response) {
        handleSubmit(response);
        form.resetFields();
      }
    }
  };

  return (
    <Modal centered
      width={500}
      title={action + ' tipo'}
      open={isModalOpen}
      onCancel={handleCancel}
      maskClosable={false}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Nombre">
          <Input />
        </Form.Item>
        <Form.Item name="color" label="Color">
          <ColorPicker showText trigger="hover" format={'hex'}/>
        </Form.Item>
        <Form.Item className="footer">
          <Button key="back" onClick={handleCancel} style={{marginRight:'15px'}}>
            Cancelar
          </Button>
          <Button htmlType="submit" style={{background: '#4096FF', color:'white'}} loading={loading}>
            {action}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditCreateType;