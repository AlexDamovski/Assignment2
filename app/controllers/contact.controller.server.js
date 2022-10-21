import contactList from '../models/contactList.js';

import { UserDisplayName } from '../utils/index.js';

export function DisplayContactList(req, res, next){
    contactList.find(function(err, contactCollection) {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', {title: 'Contact List', page: 'contact/list', contact: contactCollection, displayName: UserDisplayName(req)});
    })
}

export function DisplayContactAddPage(req, res, next){
    res.render('index', { title: 'Add Contact Information', page: 'contact/edit', contact: {}, displayName: UserDisplayName(req) });
}

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

export function DisplayContactEditPage(req, res, next){
    let id = req.params.id;

    contactList.findById(id, (err, movie) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', { title: 'Edit Contact', page: 'contact/edit', ContactList: contact, displayName: UserDisplayName(req) });
    });    
}

export function ProcessContactEditPage(req, res, next){

    let id = req.params.id;
    
    let newMovie = contactList({
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

