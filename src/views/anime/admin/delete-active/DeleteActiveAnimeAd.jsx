import React from "react";
import "./DeleteActiveAnimeAd.css";
import { Button, Modal } from "antd";
import AnimeService from "../../../../services/AnimeService";

const DeleteActiveAnimeAd = ({isDeleteModalOpen, handleDelete, handleDeleteCancel, initialValues, action}) => {
  let response;
  let buttonColor = action === 'Activar' ? 'orange' : 'red';
  const onFinish  = async () => {
    try {
      if (action === 'Activar') response = await AnimeService.activeAnime(initialValues);
      if (action === 'Desactivar') response = await AnimeService.deleteAnime(initialValues.id, {permanent: false});
      if (action === 'Eliminar definitivamente') response = await AnimeService.deleteAnime(initialValues.id, {permanent: true});
    } catch (error) {
      setError(error);
    } finally {
      if (response) handleDelete(response);
    }
  };
  return (
    <Modal centered
      title={action + ' anime'}
      open={isDeleteModalOpen}
      onCancel={handleDeleteCancel}
      maskClosable={false}
      footer={null}
    >
      <p>¿Estás seguro de que deseas {action.toLowerCase()} este anime?</p>
      <div className="footer">
        <Button key="back" onClick={handleDeleteCancel} style={{ marginRight: "15px" }}>
          Cancelar
        </Button>
        <Button onClick={onFinish} style={{ background: buttonColor, color: "white" }}>
          {action}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteActiveAnimeAd;
