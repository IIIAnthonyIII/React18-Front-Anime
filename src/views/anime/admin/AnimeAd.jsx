import moment from 'moment';
import { Button, Input, notification, Space, Table, Tag, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import AnimeService from '../../../services/AnimeService';
import { AnimeErrors } from '../../../constants/ErrorMessages';
import Notification from '../../../components/notification/Notification';
import { DeleteFilled, EditFilled, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';

const AnimeAd = () => {
  let columns                         = [];
  let uniqueEstado                     = new Set();
  const [data, setData]               = useState([]);
  const [error, setError]             = useState(null);
  const [loading, setLoading]         = useState(false);
  const [searchText, setSearchText]   = useState('');
  const [api, contextHolder]          = notification.useNotification();
  let filterEstado                    = [
    { text: "Activo", value: "A" },
    { text: "Inactivo", value: "I" }
  ];
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
      pageSizeOptions: [5, 10, 20, 50, 100],
      showQuickJumper: true,
      // total: 0,
      position: ["bottomRight"]
    },
  });

  useEffect(() => {
    fetchAnime();
    // API parametros
    // fetchAnime(tableParams.pagination.current, tableParams.pagination.pageSize);
  // }, [tableParams.pagination.current, tableParams.pagination.pageSize]);
  }, []);

  const fetchAnime = async () => {
    let response;
    setLoading(true);
    try {
      response = await AnimeService.getAnimes();
      setData(response.data.data);
    } catch (error) {
      response = {
        status: response.status,
        response: {
          data: { error: AnimeErrors.animeNotGet }
        }
      }
      Notification(api, response);
    } finally {
      setLoading(false);
    }
  };
  // API parametros
  const fetchAnimeParams = async (page, pageSize) => {
    let response;
    setLoading(true);
    try {
      response = await AnimeService.getAnimesParams(page, pageSize);
      setData(response.data.data);
      setTableParams(prevTableParams => ({
        ...prevTableParams,
        pagination: {
          ...prevTableParams.pagination,
          total: response.data.pagination.total,
          current: response.data.pagination.current_page,
          pageSize: response.data.pagination.per_page,
        },
      }));
    } catch (error) {
      response = {
        status: response.status,
        response: {
          data: { error: AnimeErrors.animeNotGet }
        }
      }
      Notification(api, response);
    } finally {
      console.log(response);
      setLoading(false);
    }
  };
  
  // Llenar filtros
  // data.forEach(element => {
  //   if (!uniqueEstado.has(element.nombre_apellido)) {
  //     uniqueEstado.add(element.nombre_apellido);
  //     filterEstado.push({
  //       text: element.nombre_apellido,
  //       value: element.nombre_apellido,
  //     });
  //   }
  // });

  //Llenar columnas
  columns = [
    {
      title: "Título",
      dataIndex: "title",
      sorter: {
        compare: (a, b) => a.title.localeCompare(b.title),
        multiple: 1,
      },
      ellipsis: true,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 2,
      },
      ellipsis: true,
    },
    {
      title: "Episodios",
      dataIndex: "episodes",
      align: "center",
      sorter: {
        compare: (a, b) => a.episodes - b.episodes,
        multiple: 3,
      },
      width: 110,
    },
    {
      title: "Estreno",
      dataIndex: "dateOfIssue",
      align: "center",
      sorter: {
        compare: (a, b) => new Date(a.dateOfIssue) - new Date(b.dateOfIssue),
        multiple: 4,
      },
      render: (text) => moment(text).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      title: "Estado",
      dataIndex: "status",
      align: "center",
      render: (_, { status }) => {
        let color = status === 'A' ? 'green' : 'red';
        let estado = status === 'A' ? 'Activo' : 'Inactivo';
        return (
          <Tag color={color}>
            {estado}
          </Tag>
        );
      },
      filterSearch: true,
      filters: filterEstado,
      onFilter: (value, data) => data.status.startsWith(value),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }}/>,
    },
    {
      title: "Acciones",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title='Editar'>
            <Button className="actions" onClick={() => showEditCreateModal(record, 'Edit')}>
              <EditFilled className="edit-icon"/>
            </Button>
          </Tooltip>
          <Tooltip title='Eliminar'>
            <Button className="actions" onClick={() => showDeleteModal(record)}>
              <DeleteFilled className="delete-icon"/>
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  //Propiedades de la tabla
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
  };
  // API parametros
  const handleTableChangeParams = (pagination) => {
    if (pagination.current !== tableParams.pagination.current ||
      pagination.pageSize !== tableParams.pagination.pageSize) {
      setTableParams(prevTableParams => ({
        ...prevTableParams,
        pagination: {
          ...pagination,
        },
      }));
    }
  };

  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(searchText.toLowerCase())     ||
    item.name.toLowerCase().includes(searchText.toLowerCase())      ||
    item.dateOfIssue.toLowerCase().includes(searchText.toLowerCase())
  );

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [action, setAction] = useState(null);
  //Edit-Create
  const showEditCreateModal = (item, action) => {
    setAction(action);
    setCurrentItem(item);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (axiosResponse) => {
    Notification(api, axiosResponse);
    setIsModalOpen(false);
    fetchExaminationOrder();
  };
  
  //Delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const showDeleteModal = (item) => {
    setCurrentItem(item);
    setIsDeleteModalOpen(true);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDelete = (axiosResponse) => {
    Notification(api, axiosResponse);
    setIsDeleteModalOpen(false);
    fetchExaminationOrder();
  };

  return (
    <div>
      <div className="header-content">
        <h3>Animes</h3>
        <div className="d-flex p-0 m-0 align-items-center">
          <div className="input-group d-flex border align-items-center me-3">
            <SearchOutlined className="mx-2"/>
            <Input className="rounded-pill"
              placeholder="Buscar paciente"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          {/* <Button className="rounded-pill me-2" type="primary" onClick={generatePDF2}>
            <FilePdfOutlined /> Reporte
          </Button> */}
          <Button className="rounded-pill" type="primary" onClick={() => showEditCreateModal(null, 'Create')}>
            <PlusCircleOutlined /> Crear
          </Button>
        </div>
      </div>
      {contextHolder}
      <Table responsive
        loading={loading}
        columns={columns}
        dataSource={filteredData}
        rowKey={"id"}
        pagination={tableParams.pagination}
        onChange={handleTableChange}/>
      {/* {isModalOpen && (
        <EditCreateExaminationOrder
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          initialValues={currentItem}
          action={action} />
      )}
      {isDeleteModalOpen && (
        <DeleteExaminationOrder 
          isDeleteModalOpen={isDeleteModalOpen}
          handleDelete={handleDelete}
          handleDeleteCancel={handleDeleteCancel}
          initialValues={currentItem} />
      )} */}
    </div>
  );
};

export default AnimeAd;