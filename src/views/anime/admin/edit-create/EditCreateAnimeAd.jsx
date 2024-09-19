import moment from 'moment';
import "./EditCreateAnimeAd.css";
import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select } from 'antd';
import dayjs from 'dayjs';
import AnimeService from '../../../../services/AnimeService';

const EditCreateAnimeAd = ({ isModalOpen, handleSubmit, handleCancel, initialValues, action }) => {
  const [form]                                  = Form.useForm();
  const [isEditing, setIsEditing]               = useState(false);
  const [error, setError]                       = useState(null);
  const [loading, setLoading]                   = useState(false);
  // const [loadingSelect, setloadingSelect]    = useState(false);
  const [dataSpecialty, setDataSpecialty]       = useState([]);
  const [specialtyOptions, setSpecialtyOptions] = useState('');
  let response;

  useEffect(() => {
    if (action==='Editar') {
      form.setFieldsValue({
        ...initialValues,
        dateOfIssue: initialValues.dateOfIssue ? dayjs(initialValues.dateOfIssue, 'YYYY-MM-DD') : null
      });
      setIsEditing(true);
    } 
    if (action==='Crear'){
      form.resetFields();
      setIsEditing(false);
    }
    // getSpecialty();
  }, [isModalOpen, initialValues, form, action]);

  // const getSpecialty = async () => {
  //   // setloadingSelect(true);
  //   try {
  //     response = await SpecialtyService.getSpecialty();
  //     setDataSpecialty(response.data.especialidades);
  //     setSpecialtyOptions(dataSpecialty.map(item => ({
  //       value: item.id_especialidad,
  //       label: item.nombre
  //     })));
  //   } catch (error) {
  //     setDataSpecialty('');
  //     setError(error);
  //   } finally {
  //     // setLoading(false);
  //   }
  // }
  // const filterSpecialty = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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
      title={action + ' anime'}
      open={isModalOpen}
      onCancel={handleCancel}
      maskClosable={false}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
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
            <Form.Item name="dateOfIssue" label="Fecha de estreno" rules={[{ required: true, message: 'Por favor ingrese la fecha!' }]}>
              <DatePicker format={{format: 'YYYY-MM-DD', type: 'mask'}}/>
            </Form.Item>
          </Col>
        </Row>
        {/* <Form.Item name="id_especialidad" label="Especialidad" rules={[{ required: true, message: 'Por favor seleccione la especialidad!' }]}> */}
          {/* <Select loading={loadingSelect} options={analisisOptions} /> */}
          {/* <Select options={specialtyOptions} showSearch filterOption={filterSpecialty}/> */}
        {/* </Form.Item> */}
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