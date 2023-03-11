import * as React from 'react';
import {
    useGetList,
    useAuthenticated,
    Datagrid,
    TextField,
    Title,
} from 'react-admin';

const sort = { field: 'published_at', order: 'DESC' };

const AuthoritiesRouteLayout = ({ title = 'Autoridades' }) => {
    useAuthenticated();

    const { data, total, isLoading } = useGetList('eventos', {
        pagination: { page: 1, perPage: 10 },
        sort,
    });

    console.log('isLoading', isLoading)
    debugger

    return !isLoading ? (
        <div>
            <Title title="Example Admin" />
            <h1>{title}</h1>
            <p>
                Found <span className="total">{total}</span> posts !
            </p>
            <Datagrid
                sort={sort}
                data={data}
                isLoading={isLoading}
                total={total}
                rowClick="edit"
            >
                <TextField source="id" sortable={false} />
                <TextField source="title" sortable={false} />
            </Datagrid>
        </div>
    ) : null;
};

export default AuthoritiesRouteLayout;
