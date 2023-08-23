import { useState } from 'react'

const usePage = () => {

    const [page, setpage] = useState(1);

    return {
        page, setpage
    }
}

export default usePage
