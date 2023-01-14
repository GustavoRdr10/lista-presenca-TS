import React, { useState, useEffect } from 'react';
import './styles.css';
import { Card, CardProps } from '../../components/Card';

type User = {
  name: string;
  avatar: string;
}

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    //imutabilidade
    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    //corpo do useEffect (ações que será executada)
    fetch('https://api.github.com/users/GustavoRdr10')
    .then(response => response.json())
    .then(data => {
      setUser ({
        name: data.name, 
        avatar: data.avatar_url,
      })
    })
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto de perfil" />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={e => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>
      {
        students.map(student => (
          <Card
            key={student.time}
            name={student.name}
            time={student.time} />
        ))
      }
    </div>
  )
}

