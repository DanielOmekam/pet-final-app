import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getPets } from '../utils/api';
import CreatePetForm from './CreatePetForm';

function PetListPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  const fetchAllPets = async () => {
    setLoading(true);
    try {
      const data = await getPets();
      setPets(data);
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPets();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Species',
      dataIndex: 'species',
      key: 'species'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (age) => age || 'N/A'
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => navigate(`/pets/${record.id}`)}>
          View
        </Button>
      )
    }
  ];

  return (
    <div style={{ background: '#fff', padding: '1rem' }}>
      <h2>All Pets</h2>
      <div style={{ marginBottom: '1rem' }}>
        <Button type="primary" onClick={() => fetchAllPets()} style={{ marginRight: '1rem' }}>
          Refresh
        </Button>
        <Button onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? 'Hide Create Pet Form' : 'Create Pet'}
        </Button>
      </div>

      {showCreate && <CreatePetForm onPetCreated={fetchAllPets} />}

      <Table
        dataSource={pets}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default PetListPage;
