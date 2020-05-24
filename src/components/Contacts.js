import React, { useState } from 'react'
import randomContacts from './../randomContacts'
import { Button, Card, FormControl, CardContent, InputLabel, Input, Fab, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'



export default function Contacts() {
    const [addNewContact, setAddNewContact] = useState(false);
    const [newContact, setNewContact] = useState({
        name: '',
        phone: '',
    })
    const [filtered,setFiltered]=useState(false)
    const [contacts, setContacts] = useState({
        list: [...randomContacts]
    })
    const [shownContacts, setShownContacts] = useState({
        list: [...contacts.list]
    })
    function handleClick() {
        setAddNewContact(!addNewContact);
    }
    function editContact(contact) {
        const arr = contacts.list
        const findElem = (x) => { return x.key === contact.key }
        const prevItem = arr.find(findElem)
        const index = arr.findIndex(findElem)
        arr[index] = { key: prevItem.key, name: prevItem.name, phone: prevItem.phone, edit: true }
        setContacts({
            list: arr
        });
        const arrShown = shownContacts.list
        const findElem2 = (x) => { return x.key === contact.key }
        const prevItem2 = arrShown.find(findElem2)
        const index2 = arrShown.findIndex(findElem2)
        arrShown[index2] = { key: prevItem2.key, name: prevItem2.name, phone: prevItem2.phone, edit: true }
        setShownContacts({
            list: arrShown})
        setNewContact({
            name: prevItem.name,
            phone: prevItem.phone,
        })
    }
    function deleteContact(contact) {
        const arr = contacts.list.filter((x) => { return x.key !== contact.key })
        setContacts({
            list: arr
        });
        const arrFiltered = shownContacts.list.filter((x) => { return x.key !== contact.key })
        setShownContacts({
            list: arrFiltered
        })
    }
    function submitChanges(contact) {
        const arr = contacts.list
        const findElem = (x) => { return x.key === contact.key }
        const prevItem = arr.find(findElem)
        const index = arr.findIndex(findElem)
        arr[index] = { key: prevItem.key, name: newContact.name, phone: newContact.phone, edit: false }
        setContacts({
            list: arr
        });
        const arrShown = shownContacts.list
        const findElem2 = (x) => { return x.key === contact.key }
        const prevItem2 = arrShown.find(findElem2)
        const index2 = arrShown.findIndex(findElem2)
        arrShown[index2] = { key: prevItem2.key, name: newContact.name, phone: newContact.phone, edit: false }
        setShownContacts({
            list: arrShown})
        setNewContact({
            name: '',
            phone: '',
        })
    }
    function addContact() {
        const arr = [{ name: newContact.name, phone: newContact.phone, edit: false, key: contacts.list.length }, ...contacts.list]
        const arrShown = [{ name: newContact.name, phone: newContact.phone, edit: false, key: contacts.list.length }, ...shownContacts.list]
        console.log(arr)
        setContacts({
            list: arr
        })
        setShownContacts({
            list: arrShown})
        setAddNewContact(!addNewContact);
    }
    function handleContactChange(event) {
        const key = event.target.name
        const val = event.target.value
        if (key !== null) {
            setNewContact(prev => ({
                ...prev,
                [key]: val,
            }))
        }
    }
    function handleFindChange(event) {
        const val = event.target.value.toLowerCase()
        const arr = contacts.list.filter(x => { return x.name.toLowerCase().includes(val) })
        
        if (val.length) {
            setShownContacts({list: arr})
            setFiltered(true)
        } else{ 
            setShownContacts({list: contacts.list})
            setFiltered(false)
        }
    }
    return (
        <div>
            <Fab onClick={handleClick} className='addBtn'>
                <AddIcon style={{ color: "gray" }} />
            </Fab>
            <div className='find'>
                <Input disableUnderline={true} inputProps={{ style: { textAlign: 'center', color: '#fff', fontFamily: 'FontAwesome' } }}
                    placeholder="&#xF002; Search Contacts" name="find" onChange={handleFindChange} />
            </div>
            <div>
                <Typography variant='h4' color='primary' align='center' style={{ marginBottom: 0 }}>
                    CONTACTS
            </Typography>
                <div className='contacts'>
                    {/* Add New Contact */}
                    {addNewContact &&
                        <div className='newContact'>
                            <Typography variant="h5" color='secondary'>New Contact</Typography>
                            <FormControl>
                                <InputLabel>Full Name</InputLabel>
                                <Input autoFocus={true} name="name" onChange={handleContactChange} />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Phone number</InputLabel>
                                <Input name="phone" type='number' onChange={handleContactChange} />
                            </FormControl>
                            <Button style={{ marginTop: 20 }} color="primary" onClick={addContact} >Add</Button>
                        </div>
                    }
                    {/* Show All Contacts */}

                    {shownContacts.list.length ? (shownContacts.list.map((contact, key) => <Card className='card' key={key} >
                        <CardContent className='cardContent' style={{ paddingBottom: 5 }} >
                            {!contact.edit &&
                                <>
                                    <Typography variant="h5" component="h2">
                                        {contact.name}
                                    </Typography>
                                    <hr className="hr" />
                                    <Typography variant="body1" component="p">
                                        {contact.phone}
                                    </Typography>
                                    <hr className="hr" />
                                    <Button color='primary' onClick={() => editContact(contact)} size="small">Edit</Button>
                                    <Button color='primary' onClick={() => deleteContact(contact)} size="small">Delete</Button>
                                </>
                            }

                            {contact.edit &&
                                <div>
                                    <Input inputProps={{ style: { textAlign: 'center' } }} disableUnderline={true} value={newContact.name} name="name" onChange={handleContactChange} />
                                    <hr className="hr" />
                                    <Input inputProps={{ style: { textAlign: 'center' } }} disableUnderline={true} value={newContact.phone} name="phone" onChange={handleContactChange} />
                                    <hr className="hr" />
                                    <Button color='primary' onClick={() => submitChanges(contact)} size="small">Change</Button>
                                </div>

                            }
                        </CardContent>

                    </Card>)) : <Typography style={{ textAlign: 'center' }} variant='h5' color='secondary'>No Results</Typography>}
                </div>
            </div>
        </div>
    )
}