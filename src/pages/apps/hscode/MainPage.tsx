import React, { useEffect, useState } from 'react';
import { styled, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import MainCard from 'components/MainCard';
import { ChatProvider } from './service/ChatContext';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import ChatHeader from 'components/common/chat/ChatHeader';
import ChatHistory from 'components/common/chat/ChatHistory';
import ChatMessageSend from 'components/common/chat/ChatMessageSend';
import ChatDrawer from 'components/common/chat/ChatDrawer';

const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop: string) => prop !== 'open' })<{ open: boolean }>(({ theme }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('lg')]: {
        paddingLeft: 0,
        marginLeft: 0
    },
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.shorter
                }),
                marginLeft: 0
            }
        }
    ]
}));


export default function MainPage() {
    const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

    const [openChatDrawer, setOpenChatDrawer] = useState(true);
    const handleDrawerOpen = () => {
        setOpenChatDrawer((prevState) => !prevState);
    };

    // close sidebar when widow size below 'md' breakpoint
    useEffect(() => {
        setOpenChatDrawer(!downLG);
    }, [downLG]);

    return (
        <Stack direction="row">
            <ChatProvider>
                <ChatDrawer
                    openChatDrawer={openChatDrawer}
                    handleDrawerOpen={handleDrawerOpen}
                />
                <Main open={openChatDrawer} sx={{ minWidth: 0 }}>
                    <Grid container>
                        <Grid
                            sx={(theme) => ({
                                transition: theme.transitions.create('width', {
                                    easing: theme.transitions.easing.easeOut,
                                    duration: theme.transitions.duration.shorter + 200
                                })
                            })}
                            size={{ xs: 12 }}
                        >
                            <MainCard
                                content={false}
                                sx={(theme: Theme) => ({
                                    bgcolor: 'grey.50',
                                    transition: theme.transitions.create('width', {
                                        easing: theme.transitions.easing.easeOut,
                                        duration: theme.transitions.duration.shorter + 200
                                    }),
                                    ...theme.applyStyles('dark', { bgcolor: 'dark.main' }),
                                    borderRadius: 1,
                                    [theme.breakpoints.down('md')]: {
                                        borderRadius: 1
                                    }
                                })}
                            >
                                <Grid container spacing={3}>
                                    <Grid sx={{ bgcolor: 'background.paper', p: 2, borderBottom: '1px solid', borderBottomColor: 'divider' }} size={12}>
                                        <ChatHeader title='Tư vấn HS Code' {...{ loading: false, openChatDrawer, handleDrawerOpen }} />
                                    </Grid>
                                    <Grid size={12} sx={{ my: -0.75 }}>
                                        <ChatHistory />
                                    </Grid>
                                    <Grid sx={{ bgcolor: 'background.paper', borderTopColor: 'divider', p: 1 }} size={12}>
                                        <ChatMessageSend />
                                    </Grid>
                                </Grid>
                            </MainCard>
                        </Grid>
                    </Grid>
                </Main>
            </ChatProvider>
        </Stack>
    );
}
