import React, { MouseEvent, useState } from 'react';
import { Drawer, Menu, MenuItem, } from '@mui/material';
import GuideAIForm from './GuideAIForm';
import { useIntl } from 'react-intl';
import { formatFieldLabel } from './fieldLabels';
import { useDefaultSetting } from 'pages/apps/default-setting/DefaultSettingContext';

interface ContextMenuProps {
    children: any;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ children }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [label, setLabel] = useState<string>("");
    const [fieldKey, setFieldKey] = useState<string>("");
    const [method, setMethod] = useState<string>("");
    const [openDrawer, setOpenDrawer] = useState(false);


    const { client } = useDefaultSetting();
    const intl = useIntl();

    // Xử lý chuột phải
    const handleContextMenu = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (!client.id) { return }
        setAnchorEl(event.currentTarget);

        let fieldKeyVar: any;
        let fieldMethod: any;
        let fieldLabel: any;

        if (Array.isArray(children)) {
            fieldKeyVar = children[0].props.children;
            fieldMethod = children[1].props.children;
            fieldLabel = children[2].props.children;
        } else {
            fieldKeyVar = children.props.field.key;
            fieldMethod = children.props.field.method;
            fieldLabel = formatFieldLabel(children.props.field, intl);
        }

        setFieldKey(fieldKeyVar as string);
        setMethod(fieldMethod as string);
        setLabel(fieldLabel as string);
    };

    const handleClose = () => setAnchorEl(null);

    const openDrawerHandler = () => {
        handleClose();
        setOpenDrawer(true);
    };

    const closeDrawerHandler = () => setOpenDrawer(false);

    return (
        <>
            <div onContextMenu={handleContextMenu}>
                {children}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{
                        '& .MuiPaper-root': (theme) => ({
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                            borderRadius: '8px',
                        }),
                        '& .MuiMenuItem-root': (theme) => ({
                            '&:hover': { backgroundColor: theme.palette.action.hover, color: theme.palette.text.primary },
                        }),
                    }}
                >
                    <MenuItem onClick={openDrawerHandler}>
                        {intl.formatMessage({ id: 'job-number.extract.import.form.context.update-guideline', defaultMessage: 'Update guidance' })}
                    </MenuItem>
                </Menu>
            </div>

            {/* Drawer */}
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={closeDrawerHandler}
                sx={{
                    zIndex: 2000,
                    '& .MuiDrawer-paper': (theme) => ({
                        width: '520px',
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                        borderRadius: '8px',
                    }),
                }}
            >
                <GuideAIForm label={label} fieldKey={fieldKey} method={method} />
            </Drawer>
        </>
    );
};

export default ContextMenu;