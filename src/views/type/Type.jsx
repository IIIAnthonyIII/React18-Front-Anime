import "./Type.css";
import React, { useEffect, useState } from 'react';
import TypeService from "../../services/TypeService";
import EditCreateType from "./edit-create/EditCreateType";
import { TypeErrors } from "../../constants/ErrorMessages";
import DeleteActiveType from "./delete-active/DeleteActiveType";
import Notification from "../../components/notification/Notification";
import { Button,Input, notification, Space, Table, Tag, Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteFilled, EditFilled, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';

const Type = () => {
  let columns                         = [];
  const [data, setData]               = useState([]);
  const [searchText, setSearchText]   = useState('');
  const [loading, setLoading]         = useState(false);
  const [api, contextHolder]          = notification.useNotification();
  const scroll                        = { x: 'max-content', y: "70vh" };
  const filterEstado                  = [
    { text: "Activo", value: "A" },
    { text: "Inactivo", value: "I" }
  ];
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
      pageSizeOptions: [5, 10, 20, 50, 100],
      showQuickJumper: true,
      position: ["bottomRight"]
    },
  });

  useEffect(() => {
    fetchType();
  }, []);

  const fetchType = async () => {
    let response;
    setLoading(true);
    try {
      response = await TypeService.getTypes();
      setData(response.data.data);
    } catch (error) {
      response = {
        status: response.status,
        response: {
          data: { error: TypeErrors.typeNotGet }
        }
      }
      Notification(api, response);
    } finally {
      setLoading(false);
    }
  };

  //Llenar columnas
  columns = [
    {
      render: (_, { status }) => {
        let color = status === 'A' ? 'green' : 'red';
        return (
          <div style={{ background: color, width: 10, height: 40, borderRadius: 100 }}></div>
        );
      },
      width: 40,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 1,
      },
    },
    {
      title: "Estado",
      dataIndex: "status",
      align: "center",
      render: (_, { id, status }) => {
        let color = status === 'A' ? 'green' : 'red';
        return (
          <Space size="middle">
            { status === 'A' 
              ? ( <Tag color={color}>Activo</Tag> )
              : ( <Tooltip title='Activar'>
                <Button className="actions" onClick={() => showDeleteActiveModal(id, 'Activar')}>
                  <CheckCircleOutlined className="active-icon"/>
                </Button>
                </Tooltip>)}
          </Space>
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
            <Button className="actions" onClick={() => showEditCreateModal(record, 'Editar')}>
              <EditFilled className="edit-icon"/>
            </Button>
          </Tooltip>
          <Tooltip title='Desactivar'>
            <Button className="actions" onClick={() => showDeleteActiveModal(record, 'Desactivar')}>
              <DeleteFilled className="delete-icon"/>
            </Button>
          </Tooltip>
          <Tooltip title='Perma delete'>
            <Button className="actions" onClick={() => showDeleteActiveModal(record, 'Eliminar definitivamente')}>
              <CloseCircleOutlined className="delete-icon"/>
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

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchText.toLowerCase())
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
    fetchType();
  };
  
  //Delete-Active
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const showDeleteActiveModal = (item, action) => {
    setAction(action);
    setCurrentItem(item);
    setIsDeleteModalOpen(true);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDelete = (axiosResponse) => {
    Notification(api, axiosResponse);
    setIsDeleteModalOpen(false);
    fetchType();
  };

  return (
    <div>
      <div className="header-content">
        <h3>Tipo</h3>
        <div className="d-flex p-0 m-0 align-items-center">
          <div className="input-group d-flex border align-items-center me-3">
            <SearchOutlined className="mx-2"/>
            <Input className="rounded-pill"
              placeholder="Buscar tipo"
              value={searchText}
              onChange={e => setSearchText(e.target.value)} />
          </div>
          <Button className="rounded-pill" type="primary" onClick={() => showEditCreateModal(null, 'Crear')}>
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
        onChange={handleTableChange}
        scroll={scroll}/>
      {isModalOpen && (
        <EditCreateType
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          initialValues={currentItem}
          action={action} />
      )}
      {isDeleteModalOpen && (
        <DeleteActiveType
          isDeleteModalOpen={isDeleteModalOpen}
          handleDelete={handleDelete}
          handleDeleteCancel={handleDeleteCancel}
          initialValues={currentItem} 
          action={action} />
      )}
    </div>
  );
};

export default Type;