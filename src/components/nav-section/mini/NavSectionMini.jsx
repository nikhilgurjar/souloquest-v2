import { memo } from 'react';
import { Box, Stack } from '@mui/material';
import NavList from './NavList';
// ----------------------------------------------------------------------
function NavSectionMini({ data, sx, ...other }) {
    return (<Stack spacing={0.5} alignItems="center" sx={{
            px: 0.75,
            ...sx,
        }} {...other}>
      {data.map((group, index) => (<Items key={group.subheader} items={group.items} isLastGroup={index + 1 === data.length}/>))}
    </Stack>);
}
export default memo(NavSectionMini);
function Items({ items, isLastGroup }) {
    return (<>
      {items.map((list) => (<NavList key={list.title + list.path} data={list} depth={1} hasChild={!!list.children}/>))}

      {!isLastGroup && (<Box sx={{
                width: 24,
                height: '1px',
                bgcolor: 'divider',
                my: '8px !important',
            }}/>)}
    </>);
}
