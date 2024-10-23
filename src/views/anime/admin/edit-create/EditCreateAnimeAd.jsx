import dayjs from 'dayjs';
import moment from 'moment';
import "./EditCreateAnimeAd.css";
import React, { useEffect, useState } from 'react';
import AnimeService from '../../../../services/AnimeService';
import environment from '../../../../environment/environment';
import { Button, Col, DatePicker, Form, Image, Input, InputNumber, Modal, Row, Select } from 'antd';

const EditCreateAnimeAd = ({ isModalOpen, handleSubmit, handleCancel, initialValues, types, action }) => {
  const [form]                                  = Form.useForm();
  const [error, setError]                       = useState(null);
  const [loading, setLoading]                   = useState(false);
  const [typeOptions, setTypeOptions]           = useState('');
  let response;

  useEffect(() => {
    if (action==='Editar') {
      form.setFieldsValue({
        ...initialValues,
        dateOfIssue: initialValues.dateOfIssue ? dayjs(initialValues.dateOfIssue, 'YYYY-MM-DD') : null
      });
    } 
    if (action==='Crear') form.resetFields();
    setTypeOptions(types.map(item => ({
      value: item.id,
      label: item.name
    })));
  }, [isModalOpen, initialValues, form, action]);

  const filterType = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        dateOfIssue: moment(new Date(values.dateOfIssue)).format('YYYY-MM-DD HH:mm:ss')
      };
      if (action==='Editar') response = await AnimeService.editAnime(initialValues.id, formattedValues);
      if (action==='Crear') response = await AnimeService.createAnime(formattedValues);
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
      width={600}
      title={action + ' anime'}
      open={isModalOpen}
      onCancel={handleCancel}
      maskClosable={false}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[16, 8]}>
          <Col span={9}>
            <Image height={240}
              src={(action==='Crear') ? '' : initialValues.image}
              fallback={environment.errorImage}
            />
            <Form.Item name="image" label="Url imagen">
              <Input />
            </Form.Item>
          </Col>
          <Col span={15}>
            <Form.Item name="title" label="Titulo" rules={[{ required: true, message: 'Por favor ingrese el titulo!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="name" label="Nombre">
              <Input />
            </Form.Item>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <Form.Item name="episodes" label="Número de episodios">
                  <InputNumber min={1}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="type_id" label="Tipo" rules={[{ required: true, message: 'Por favor seleccione un tipo!' }]}>
                  <Select options={typeOptions} showSearch filterOption={filterType}/>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="dateOfIssue" label="Fecha de estreno" rules={[{ required: true, message: 'Por favor ingrese la fecha!' }]}>
              <DatePicker format={{format: 'YYYY-MM-DD', type: 'mask'}}/>
            </Form.Item>
          </Col>
        </Row>
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
};

export default EditCreateAnimeAd;