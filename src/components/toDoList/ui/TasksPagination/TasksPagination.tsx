import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { ChangeEvent } from 'react'
import s from './TasksPagination.module.css'
import { PAGE_SIZE } from 'components/task/api/tasksApi'

type Props = {
    totalCount: number
    page: number
    setPage: (page: number) => void
}

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
    const changePageHandler = (_: ChangeEvent<unknown>, page: number) => {
        setPage(page)
    }

    return (
        <div className={''}>
            <Pagination
                count={Math.ceil(totalCount / PAGE_SIZE)}
                page={page}
                onChange={changePageHandler}
                shape="rounded"
                color="primary"
                className={s.pagination}
                variant="outlined"
                defaultPage={1}
                siblingCount={1}
                boundaryCount={0}
                showFirstButton={false}
                showLastButton={false}
            />
            <div className={s.totalCount}>
                <Typography variant="caption">Total: {totalCount}</Typography>
            </div>
        </div>
    )
}