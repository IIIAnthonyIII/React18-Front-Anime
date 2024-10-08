import moment from 'moment';
import "./EditCreateAnimeAd.css";
import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Image, Input, InputNumber, Modal, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';
import AnimeService from '../../../../services/AnimeService';
import { DownloadOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, UndoOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import environment from '../../../../environment/environment';

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
              src={initialValues.image}
              fallback={environment.errorImage}
              preview={{
                toolbarRender: (_,
                  {
                    image: { url },
                    transform: { scale },
                    actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, onReset },
                  },
                ) => (
                  <Space size={12} className="toolbar-wrapper">
                    <DownloadOutlined onClick={() => onDownload(url)} />
                    <SwapOutlined rotate={90} onClick={onFlipY} />
                    <SwapOutlined onClick={onFlipX} />
                    <RotateLeftOutlined onClick={onRotateLeft} />
                    <RotateRightOutlined onClick={onRotateRight} />
                    <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                    <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                    <UndoOutlined onClick={onReset} />
                  </Space>
                ),
              }}
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
            <Form.Item name="episodes" label="Número de episodios">
              <InputNumber min={1}/>
            </Form.Item>
            <Form.Item name="dateOfIssue" label="Fecha de estreno" rules={[{ required: true, message: 'Por favor ingrese la fecha!' }]}>
              <DatePicker format={{format: 'YYYY-MM-DD', type: 'mask'}}/>
            </Form.Item>
          </Col>
        </Row>
        {/* <Row gutter={[16, 8]}>
          <Col span={12}>
            
          </Col>
          <Col span={12}>
            
          </Col>
        </Row> */}
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