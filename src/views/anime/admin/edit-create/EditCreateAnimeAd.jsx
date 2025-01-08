import dayjs from 'dayjs';
import moment from 'moment';
import "./EditCreateAnimeAd.css";
import React, { useEffect, useState } from 'react';
import AnimeService from '../../../../services/AnimeService';
import environment from '../../../../environment/environment';
import { Button, Checkbox, Col, DatePicker, Form, Image, Input, InputNumber, Modal, Row, Select } from 'antd';

const EditCreateAnimeAd = ({ isModalOpen, handleSubmit, handleCancel, initialValues, dataAnime, types, action }) => {
  const [form]                                  = Form.useForm();
  const [loading, setLoading]                   = useState(false);
  const [typeOptions, setTypeOptions]           = useState('');
  const [relationOptions, setRelationOptions]   = useState('');
  const [checked, setChecked]                   = useState(false);
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
    setRelationOptions(dataAnime.map(item => ({
      value: item.id,
      label: item.title
    })));
  }, [isModalOpen, initialValues, form, action]);

  const filterType = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const filterRelation = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const onChangeChecked = (e) => setChecked(e.target.checked);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        episodes: (values.episodes) ? values.episodes : 0,
        relation: (checked) ? null : values.relation,
        dateOfIssue: moment(new Date(values.dateOfIssue)).format('YYYY-MM-DD HH:mm:ss')
      };
      if (action==='Editar') response = await AnimeService.editAnime(initialValues.id, formattedValues);
      if (action==='Crear') response = await AnimeService.createAnime(formattedValues);
    } catch (error) {
      console.error(error);
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
      width={650}
      title={action + ' anime'}
      open={isModalOpen}
      onCancel={handleCancel}
      maskClosable={false}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[16, 8]}>
          <Col span={10}>
            <Row gutter={[8, 16]}>
              <Image height={345}
                src={(action==='Crear') ? '' : initialValues.image}
                fallback={environment.errorImage}
              />
              <Col span={24}>
                <Form.Item name="image" label="Url imagen">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={14}>
            <Form.Item name="title" label="Titulo" rules={[{ required: true, message: 'Por favor ingrese el titulo!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="name" label="Nombre">
              <Input />
            </Form.Item>
            <Form.Item name="relation" label="Relación">
              <Select options={relationOptions} showSearch filterOption={filterRelation} disabled={checked}/>
            </Form.Item>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <Form.Item name="episodes" label="Número de episodios">
                  <InputNumber min={0}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="type_id" label="Tipo" rules={[{ required: true, message: 'Por favor seleccione un tipo!' }]}>
                  <Select options={typeOptions} showSearch filterOption={filterType}/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 8]}>
            <Col span={12}>
              <Form.Item name="dateOfIssue" label="Fecha de estreno" rules={[{ required: true, message: 'Por favor ingrese la fecha!' }]}>
                <DatePicker format={{format: 'YYYY-MM-DD', type: 'mask'}}/>
              </Form.Item>
            </Col>
            {action === 'Crear' && (
              <Col span={12}>
                <Form.Item name="firstTime" valuePropName="checked" label="Primera vez?">
                  <Checkbox checked={checked} onChange={onChangeChecked}/>
                </Form.Item>
              </Col>
            )}
            </Row>
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