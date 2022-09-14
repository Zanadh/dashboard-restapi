import { useState, ReactNode, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserInterface } from '../../interfaces/user';
import { Checkbox, Button, Box } from '@mui/material';
import { putUserPermissions } from '../../api/putUserPermissions';
import { getAllUser } from '../../api/getAllUser';

interface ColumnInterface {
  id: 'name' | 'email' | 'permissions';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: ({
    value,
    rowData,
    rowIndex,
  }: {
    value: string;
    rowData: UserInterface;
    rowIndex: number;
  }) => ReactNode;
}

type PermissionType = 'READ_USER' | 'READ_TRANSACTION';

const ALL_PERMISSIONS: { label: string; id: PermissionType }[] = [
  { label: 'READ USER', id: 'READ_USER' },
  { label: 'READ TRANSACTION', id: 'READ_TRANSACTION' },
];

const User = () => {
  const [users, setUsers] = useState<UserInterface[]>(JSON.parse(JSON.stringify([])));
  const [usersTmp, setUsersTmp] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUser();
      console.log('res', res.data.data);
      if (res.status === 200) {
        setUsers(JSON.parse(JSON.stringify(res.data.data)));
        setUsersTmp(JSON.parse(JSON.stringify(res.data.data)));
      }
    };
    fetchData();
  }, []);

  const handleOnChangePermission = ({
    rowIndex,
    isAdding,
    permission,
  }: {
    permission: PermissionType;
    isAdding: boolean;
    rowIndex: number;
  }) => {
    const tmpData = [...usersTmp];
    const userPermissions = tmpData[rowIndex].permissions.split(',');
    if (isAdding) {
      userPermissions.push(permission);
    } else {
      const permissionIndex = userPermissions.findIndex((v) => v === permission);
      if (permissionIndex >= 0) {
        userPermissions.splice(permissionIndex, 1);
      }
    }

    tmpData[rowIndex].permissions = userPermissions
      .filter((v) => !!v)
      .sort()
      .join(',');

    setUsersTmp(tmpData);
  };

  const renderPermissionRole = ({
    permissions,
    rowIndex,
  }: {
    permissions: string[];
    rowData: UserInterface;
    rowIndex: number;
  }) => (
    <div>
      {ALL_PERMISSIONS.map(({ id, label }, i) => (
        <span key={i} style={{ marginRight: 8, whiteSpace: 'nowrap' }}>
          <Checkbox
            checked={permissions.includes(id)}
            onChange={(v) =>
              handleOnChangePermission({ permission: id, isAdding: v.target.checked, rowIndex })
            }
          />
          {label}
        </span>
      ))}
    </div>
  );

  const columns: ColumnInterface[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 200 },
    {
      id: 'permissions',
      label: 'Permissions',
      minWidth: 170,
      align: 'right',
      format: ({ value = '', rowData, rowIndex }) => {
        return renderPermissionRole({ permissions: value.split(','), rowData: rowData, rowIndex });
      },
    },
  ];

  const handleClickCancel = ({ index }: { index: number }) => {
    const tmpData = JSON.parse(JSON.stringify(usersTmp));
    tmpData[index] = { ...users[index] };
    setUsersTmp(tmpData);
  };

  const handleClickSave = async ({ index, rowData }: { index: number; rowData: UserInterface }) => {
    try {
      const res = await putUserPermissions({ ...rowData });
      if (res.status === 200) {
        const tmpData = JSON.parse(JSON.stringify(users));
        tmpData[index] = { ...usersTmp[index] };
        setUsers(tmpData);
      }
    } catch (error) {
      alert('failed to update user permissions');
    }
  };

  return (
    <div>
      <h1>User</h1>

      <p>
        the permission changes will only be applied once the user is logged in after the data is
        changed
      </p>

      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align={'center'}> Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersTmp.map((row, rowIdx) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIdx}>
                    <TableCell>{rowIdx + 1}</TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {(column.format
                            ? column.format({ value: value || '', rowData: row, rowIndex: rowIdx })
                            : value) || '-'}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <Box display={'flex'} gap={1}>
                        <Button
                          variant="outlined"
                          disabled={usersTmp[rowIdx].permissions === users[rowIdx].permissions}
                          color="error"
                          onClick={() => handleClickCancel({ index: rowIdx })}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          disabled={usersTmp[rowIdx].permissions === users[rowIdx].permissions}
                          onClick={() => handleClickSave({ index: rowIdx, rowData: row })}
                        >
                          Save
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default User;
