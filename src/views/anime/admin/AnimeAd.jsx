import "./AnimeAd.css";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import AnimeService from '../../../services/AnimeService';
import { AnimeErrors, TypeErrors } from '../../../constants/ErrorMessages';
import DeleteActiveAnimeAd from "./delete-active/DeleteActiveAnimeAd";
import EditCreateAnimeAd from "./edit-create/EditCreateAnimeAd";
import Notification from '../../../components/notification/Notification';
import { Button, Image, Input, notification, Space, Table, Tag, Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteFilled, DownloadOutlined, EditFilled, PlusCircleOutlined, RotateLeftOutlined, RotateRightOutlined, SearchOutlined, SwapOutlined, UndoOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import environment from "../../../environment/environment";
import TypeService from "../../../services/TypeService";

const AnimeAd = ({navigHandled}) => {
  let columns                         = [];
  let uniqueEstado                    = new Set();
  const [width, setWidth]             = useState(navigHandled);
  const [data, setData]               = useState([]);
  const [dataType, setType]           = useState([]);
  const [typeSelect, setTypeSelect]   = useState([]);
  const [searchText, setSearchText]   = useState('');
  const [loading, setLoading]         = useState(false);
  const [api, contextHolder]          = notification.useNotification();
  const scroll                        = { y: "70vh" };
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
      // total: 0,
      position: ["bottomRight"]
    },
  });

  useEffect(() => {
    setWidth(navigHandled);
  }, [navigHandled]);

  useEffect(() => {
    fetchType();
    fetchAnime();
    // API parametros
    // fetchAnime(tableParams.pagination.current, tableParams.pagination.pageSize);
  // }, [tableParams.pagination.current, tableParams.pagination.pageSize]);
  }, []);

  const fetchAnime = async () => {
    let response;
    setLoading(true);
    
    try {
      const startTime = performance.now();
      response = await AnimeService.getAnimes();
      setData(response.data.data);
    const endTime = performance.now();
    console.log(`Fetch anime data took ${endTime - startTime} milliseconds`);
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
  const fetchType = async () => {
    let response;
    try {
      response = await TypeService.getTypes();
      const types = response.data.data.map(type => ({
        text: type.name,
        value: type.name
      }));
      setType(types);
      setTypeSelect(response.data.data);
    } catch (error) {
      response = {
        status: response.status,
        response: {
          data: { error: TypeErrors.typeNotGet }
        }
      }
      Notification(api, response);
    }
  };

  const onDownload = (imgUrl) => {
    fetch(imgUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = imgUrl.split('/').pop();;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  //Llenar columnas
  columns = [
    {
      render: (_, { type }) => {
        return (
          <div style={{ background: type.color, width: 10, height: 40, borderRadius: 100 }}></div>
        );
      },
      width: 40,
    },
    {
      title: "Portada",
      dataIndex: "image",
      width: 100,
      render: (_, { image }) => {
        return (
          <Image width={50}
            height={50}
            src={image}
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
        );
      },
    },
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
      title: "Tipo",
      dataIndex: "type",
      align: "center",
      width: 110,
      render: (_, { type }) => {
        return (
          <Space size="middle">
            <Tag color={type.color}>{type.name}</Tag>
          </Space>
        );
      },
      filterSearch: true,
      filters: dataType,
      onFilter: (value, data) => data.type.name.startsWith(value),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }}/>,
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
      width: 120,
      sorter: {
        compare: (a, b) => new Date(a.dateOfIssue) - new Date(b.dateOfIssue),
        multiple: 4,
      },
      render: (text) => moment(text).format('DD-MM-YYYY'),
    },
    {
      title: "Estado",
      dataIndex: "status",
      align: "center",
      width: 90,
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
      width: 160,
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

  const animeFather = data.filter(anime => anime.id === anime.relation).sort((a, b) => a.title.localeCompare(b.title));;
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
    fetchAnime();
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
    fetchAnime();
  };

  return (
    <div style={{width: width+'vw', transition: '0.5s'}}>
      <div className="header-content">
        <h3>Animes</h3>
        <div className="d-flex p-0 m-0 align-items-center">
          <div className="input-group d-flex border align-items-center me-3">
            <SearchOutlined className="mx-2"/>
            <Input className="rounded-pill"
              placeholder="Buscar anime"
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
        <EditCreateAnimeAd
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          initialValues={currentItem}
          dataAnime={animeFather}
          types={typeSelect}
          action={action} />
      )}
      {isDeleteModalOpen && (
        <DeleteActiveAnimeAd 
          isDeleteModalOpen={isDeleteModalOpen}
          handleDelete={handleDelete}
          handleDeleteCancel={handleDeleteCancel}
          initialValues={currentItem} 
          action={action} />
      )}
    </div>
  );
};

export default AnimeAd;