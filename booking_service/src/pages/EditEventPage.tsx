import Header from '../components/Header';
import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventData, fetchFilledCustomData, getInfoRegisterForEvent } from '../store/api-actions';

import { useAppDispatch, useAppSelector } from '../hooks';
import EditEventForm from '../components/EditEventForm';
import { getEvent, getFilledCustom, getInfoForRegister } from '../store/events-process/selectors';

export default function EditEventPage() {
    const urlParams = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchEventData({ id: Number(urlParams.id) }));
        dispatch(fetchFilledCustomData({ id: Number(urlParams.id) }));
    }, [dispatch, urlParams.id]);
    const filledCustom = useAppSelector(getFilledCustom);
    const event = useAppSelector(getEvent);
    useEffect(() => {
        if (event?.status === 'close') {
            if (event.unique_key) {
                dispatch(getInfoRegisterForEvent({ id: event.unique_key }));
            }
        } else {
            if (urlParams.id) {
                dispatch(getInfoRegisterForEvent({ id: urlParams.id }));
            }
        }
    }, [dispatch, event?.creator.contacts.email, event?.id, event?.status, event?.unique_key, urlParams.id]);
    const infoForRegister = useAppSelector(getInfoForRegister);
    return (
        <>
            <Header />
            <EditEventForm event={event} customField={infoForRegister?.custom_fields} filledCustom={filledCustom} />
        </>
    );
}
