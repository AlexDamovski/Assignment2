import contactList from '../models/contactList.js';

import { UserDisplayName } from '../utils/index.js';


//Diplays the contacts in the datebase
export function DisplayContactList(req, res, next){
    contactList.find(function(err, contactCollection) {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', {title: 'Contact List', page: 'contact/list', contact: contactCollection, displayName: UserDisplayName(req)});
    })
}

//display form the add contact to database
export function DisplayContactAddPage(req, res, next){
    res.render('index', { title: 'Add Contact Information', page: 'contact/edit', contact: {}, displayName: UserDisplayName(req) });
}


//processes the information 
export function ProcessContactAddPage(req, res, next){
    
    let newContact = contactList({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email
    });

    contactList.create(newContact, (err, contact) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/contact-list')
    } )
}

//displays edit page
export function DisplayContactEditPage(req, res, next){
    let id = req.params.id;

    contactList.findById(id, (err, contact) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', { title: 'Edit Contact', page: 'contact/edit', contact: contact, displayName: UserDisplayName(req) });
    });    
}

//process any changes that were made
export function ProcessContactEditPage(req, res, next){

    let id = req.params.id;
    
    let newContact = ({
            name: req.body.name,
            number: req.body.number,
            email: req.body.email
    });

    contactList.updateOne({_id: id }, newContact, (err, Contact) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/contact-list');
    } )
}

//process contact deletion 
export function ProcessContactDelete(req, res, next){
    let id = req.params.id;

    contactList.remove({_id: id}, (err) => {
        if (err){
            console.error(err);
            res.end(err);
        }

        res.redirect('/contact-list');
    })
}

