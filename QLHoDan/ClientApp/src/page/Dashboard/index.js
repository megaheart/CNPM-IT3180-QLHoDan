import { useState, useEffect } from 'react';

import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';
import ImgMediaCard from '../../components/Card';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import PieChart from '~/components/PieChart';

import family from '~/assets/Image/Dashboard/family.png'
import person from '~/assets/Image/Dashboard/person.png'
import door from '~/assets/Image/Dashboard/door.png'
import leave from '~/assets/Image/Dashboard/leave.png'

import useAuth from '~/hooks/useAuth';
import householdManager from '~/services/api/householdManager';
import residentManager from '~/services/api/residentManager';
import {
    useQuery
} from '@tanstack/react-query';

export default function DashboardComponent() {

    const { auth } = useAuth();

    const queryAllHousehold = useQuery(
        ['households'], async () => householdManager.getHouseholdList(auth.token)
    );

    const queryHouseholdMove = useQuery(
        ['householdsMove'], async () => householdManager.getHouseholdListMove(auth.token)
    );

    const queryAllResident = useQuery(
        ['residents'], async () => residentManager.getAllResident(auth.token)
    );
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} >
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <ImgMediaCard
                                sx={{ margin: '0 auto' }}
                                content='Tổng số hộ khẩu: '
                                number={(queryAllHousehold.isLoading || queryHouseholdMove.isLoading) ? 'Loadling' : queryAllHousehold.data.length + queryHouseholdMove.data.length}
                                imgLink={family}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ImgMediaCard
                                sx={{ margin: '0 auto' }}
                                content="Tổng số nhân khẩu: "
                                number={(queryAllResident.isLoading) ? 'Loadling' : queryAllResident.data.length}
                                imgLink={person}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ImgMediaCard
                                sx={{ margin: '0 auto' }}
                                content="Số hộ thường trú: "
                                number={(queryAllHousehold.isLoading) ? 'Loadling' : queryAllHousehold.data.length}
                                imgLink={door}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ImgMediaCard
                                sx={{ margin: '0 auto' }}
                                content="Số hộ tạm vắng: "
                                number={(queryHouseholdMove.isLoading) ? 'Loadling' : queryHouseholdMove.data.length}
                                imgLink={leave}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    {!(queryAllHousehold.isLoading || queryHouseholdMove.isLoading) &&
                        <div width={400} height={400}>
                            <PieChart
                                chartData={
                                    {
                                        labels: ['Thường trú', 'Chuyển đi'],
                                        datasets: [
                                            {
                                                label: 'Hộ khẩu',
                                                data: [queryAllHousehold.data.length, queryHouseholdMove.data.length],
                                                backgroundColor: [
                                                    "rgba(75,192,192,1)",
                                                    "#ecf0f1",
                                                    "#50AF95",
                                                ],
                                                borderColor: "black",
                                                borderWidth: 2,
                                            },

                                        ]
                                    }
                                }
                            />
                        </div>}
                </Grid>
            </Grid>
        </Box>
    )
}