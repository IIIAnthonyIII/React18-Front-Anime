import moment from 'moment';
import { notification, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import AnimeService from '../../../services/AnimeService';
import { AnimeErrors } from '../../../constants/ErrorMessages';
import Notification from '../../../components/notification/Notification';

const AnimeAd = () => {
  let columns                         = [];
  let filterMedic                     = [];
  let uniqueMedic                     = new Set();
  const [data, setData]               = useState([]);
  const [error, setError]             = useState(null);
  const [loading, setLoading]         = useState(false);
  const [searchText, setSearchText]   = useState('');
  const [api, contextHolder]          = notification.useNotification();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
      pageSizeOptions: [5, 10, 20, 50, 100],
      showQuickJumper: true,
      total: 0,
      position: ["bottomRight"]
    },
  });
  let count = 0;

  useEffect(() => {
    // fetchAnime();
    fetchAnime(tableParams.pagination.current, tableParams.pagination.pageSize);
  // }, [JSON.stringify(tableParams)]);
  }, []);

  // const fetchAnime = async () => {
  //   let response;
  //   setLoading(true);
  //   try {
  //     response = await AnimeService.getAnimes();
  //     setData(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //     response = {
  //       status: response.status,
  //       response: {
  //         data: { error: AnimeErrors.animeNotGet }
  //       }
  //     }
  //     Notification(api, response);
  //   } finally {
  //     setLoading(false);
  //     count++;
  //     console.log(count);
  //   }
  // };

  const fetchAnime = async (page, pageSize) => {
    let response;
    setLoading(true);
    try {
      response = await AnimeService.getAnimes(page, pageSize);
      setData(response.data.data);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: response.data.pagination.total,
          current: response.data.pagination.current_page,
          pageSize: response.data.pagination.per_page,
        },
      });
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
  
  //Llenar filtros
  // data.forEach(element => {
  //   if (!uniqueMedic.has(element.nombre_apellido)) {
  //     uniqueMedic.add(element.nombre_apellido);
  //     filterMedic.push({
  //       text: element.nombre_apellido,
  //       value: element.nombre_apellido,
  //     });
  //   }
  // });

  // const generatePDF = (data) => {
  //   PDFExaminationOrder(data)
  // };

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
        compare: (a, b) => a.episodes.localeCompare(b.episodes),
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
    },
    // {
    //   title: "Médico",
    //   dataIndex: "nombre_apellido",
    //   sorter: {
    //     compare: (a, b) => a.nombre_apellido.localeCompare(b.nombre_apellido),
    //     multiple: 3,
    //   },
    //   filters: filterMedic,
    //   onFilter: (value, data) => data.nombre_apellido.startsWith(value),
    //   filterSearch: true,
    // },
    // {
    //   title: "Examen",
    //   dataIndex: "examen",
    //   align: "center",
    //   render: (_, { analisis }) => (
    //     <>
    //       {analisis.map((analysis) => 
    //           analysis.examen.map((exam) => (
    //             <Tag key={exam.id_examen}>
    //               {exam.examen}
    //             </Tag>
    //           )
    //         ))
    //       }
    //     </>
    //   ),
    // },
    // {
    //   title: "Acciones",
    //   key: "action",
    //   align: "center",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Tooltip title='Descargar orden'>
    //         <Button className="actions" onClick={() => generatePDF(record)}>
    //           <FilePdfOutlined className="download-icon"/>
    //         </Button>
    //       </Tooltip>
    //       <Tooltip title='Editar'>
    //         <Button className="actions" onClick={() => showEditCreateModal(record, 'Edit')}>
    //           <EditFilled className="edit-icon"/>
    //         </Button>
    //       </Tooltip>
    //       <Tooltip title='Eliminar'>
    //         <Button className="actions" onClick={() => showDeleteModal(record)}>
    //           <DeleteFilled className="delete-icon" />
    //         </Button>
    //       </Tooltip>
    //     </Space>
    //   ),
    // },
  ];

  //Propiedades de la tabla
  // const handleTableChange = (pagination, filters, sorter) => {
  //   setTableParams({
  //     pagination,
  //     filters,
  //     sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
  //     sortField: Array.isArray(sorter) ? undefined : sorter.field,
  //   });
  // };
  const handleTableChange = (pagination) => {
    // if ( tableParams.pagination.current !== pagination.current ||
    //   tableParams.pagination.pageSize !== pagination.pageSize) {
      setTableParams({
        ...tableParams,
        pagination: {
          ...pagination,
        },
      });
    // }
  };

  const filteredData = data;
  // data.filter(item => 
  //   item.paciente.toLowerCase().includes(searchText.toLowerCase()) ||
  //   item.nombre_apellido.toLowerCase().includes(searchText.toLowerCase()) ||
  //   item.paciente_cedula.toLowerCase().includes(searchText.toLowerCase()) ||
  //   item.especialidad.toLowerCase().includes(searchText.toLowerCase())
  // );

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
  // const generatePDF2 = () => {
  //   const doc = new jsPDF();
  //   doc.setFontSize(12);
  //   doc.text('Reporte de Ordenes de Examenes',20, 20,);
  //   const usersData = data.map(mantexamen => [mantexamen.paciente, mantexamen.paciente_cedula, 
  //     mantexamen.nombre_apellido, mantexamen.especialidad
  //   ]);
  //   doc.autoTable({
  //     head: [['Paciente', 'Cédula', 'Medico', 'Especialidad']],
  //     body: usersData,
  //   });
  //   doc.save('reporte_OrdExamen.pdf');
  // };
  return (
    <div>
      {/* <div className="header-content">
        <h3>Orden de examenes</h3>
        <div className="d-flex p-0 m-0 align-items-center">
          <div className="input-group d-flex border align-items-center me-3">
            <SearchOutlined className="mx-2"/>
            <Input className="rounded-pill"
              placeholder="Buscar paciente"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          <Button className="rounded-pill me-2" type="primary" onClick={generatePDF2}>
            <FilePdfOutlined /> Reporte
          </Button>
          <Button className="rounded-pill" type="primary" onClick={() => showEditCreateModal(null, 'Create')}>
            <PlusCircleOutlined /> Crear
          </Button>
        </div>
      </div> */}
      {contextHolder}
      <Table responsive
        loading={loading}
        columns={columns}
        dataSource={data}
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