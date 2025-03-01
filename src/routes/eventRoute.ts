import express, { Request, Response } from "express";
import * as service from "../services/eventService";
import type { Event } from "../models/event";
import exp from "constants";
import { parse } from "path";
const router = express.Router();

router.get("/", async(req, res) => {
    if (req.query.pageSize && req.query.pageNo) {
        const pageSize = parseInt(req.query.pageSize as string);
        const pageNo = parseInt(req.query.pageNo as string);
        const events = await service.getAllEventsWithOrganizerPagination(pageSize, pageNo);
        const totalEvents = await service.countEvent();
        res.json({ events, totalEvents });
    } else if (req.query.category) {
    const category = req.query.category;
    const filteredEvents = await service.getEventByCategory(category as string);
    res.json(filteredEvents);
    } else {
    res.json(await service.getAllEvents());
    }
});


router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const event = await service.getEventById(id);
    if (event) {
    res.json(event);
    } else {
    res.status(404).send("Event not found");
    }
});  

router.post("/", async (req, res) => {       
    const newEvent: Event = req.body;    
    const result = await service.addEvent(newEvent);
    res.json(result);
});

export default router;