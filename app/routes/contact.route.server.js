import { Router } from "express";

import {  DisplayContactList, 
    DisplayContactAddPage, 
    ProcessContactAddPage, 
    ProcessContactEditPage, 
    DisplayContactEditPage, 
    ProcessContactDelete } from "../controllers/contact.controller.server.js";

import { AuthGuard } from "../utils/index.js";

const router = Router();

router.get('/contact-list', DisplayContactList);
router.get('/contact-add', AuthGuard, DisplayContactAddPage);
router.post('/contact-add', AuthGuard, ProcessContactAddPage);
router.post('/contact-edit/:id', AuthGuard, ProcessContactEditPage);
router.get('/contact-edit/:id', AuthGuard, DisplayContactEditPage);
router.get('/contact-delete/:id' , AuthGuard, ProcessContactDelete);

export default router;