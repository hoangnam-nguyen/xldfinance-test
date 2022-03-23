import { Box, Button, Card, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export default function App() {
  const [name, setName] = useState('');
  const [wallet, setWallet] = useState('');
  const [email, setEmail] = useState('');
  const [updateId, setUpdateId] = useState(0);
  const [userList, setUserList] = useState(localStorage["user_data"] ? JSON.parse(localStorage["user_data"]) : []);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdate) {
      let list = [...userList];
      list[updateId]["name"] = name;
      list[updateId]["wallet"] = wallet;
      list[updateId]["email"] = email;
      setUserList(list);
      setIsUpdate(!isUpdate);
      setName('');
      setWallet('');
      setEmail('');
    } else {
      let newUser = { name, wallet, email };
      newUser.id = userList.length;
      localStorage["user_data"] = JSON.stringify([...userList, newUser]);
      setUserList([...userList, newUser]);
      setName('');
      setWallet('');
      setEmail('');
    }
  }

  const handleDelete = (id) => {
    setUserList([...userList.filter(user => user.id !== id)]);
  }

  const handleUpdate = (user) => {
    setIsUpdate(!isUpdate);
    setUpdateId(user.id);
    setName(user.name);
    setWallet(user.wallet);
    setEmail(user.email);
  }

  return (
    <Box className={isUpdate && 'background-dark'}>
      <Card style={{ maxWidth: '70%', margin: "0 auto", padding: "20px 5px" }} className={isUpdate && 'update-mode'}>
        <CardContent>
          {isUpdate && <Typography gutterBottom variant="h5" component="div">Enter new user's info:</Typography>}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid xs={12} item>
                <TextField label="Name" placeholder='Enter your name' variant='outlined' fullWidth required value={name} onChange={(e) => setName(e.target.value)} />
              </Grid>
              <Grid xs={12} item>
                <TextField label="Wallet Address" multiline placeholder='Enter your wallet address' variant='outlined' fullWidth required value={wallet} onChange={(e) => setWallet(e.target.value)} />
              </Grid>
              <Grid xs={12} item>
                <TextField type='email' label="Email" placeholder='Enter your email' variant='outlined' fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
              </Grid>
              <Grid xs={12} item>
                <Button type='submit' variant='contained' color={isUpdate ? 'error' : 'primary'} fullWidth>{isUpdate ? "Update Account" : "Add Account"}</Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Grid container spacing={1} style={{ maxWidth: '100%', margin: "0 auto", padding: "20px 0px" }}>
        {userList.map(user => (
          <Grid key={user.id} xs={4} item >
            <Card style={{ maxWidth: '100%', margin: "0 auto", padding: "5px 5px" }}>
              <CardContent>
                <Typography>{user.name}</Typography>
                <Typography>{user.wallet}</Typography>
                <Typography>{user.email}</Typography>
              </CardContent>
              <CardActions>
                <Button size='small' variant='outlined' onClick={() => handleUpdate(user)}>Update</Button>
                <Button size='small' variant='outlined' onClick={() => handleDelete(user.id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
