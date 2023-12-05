import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'

{
  /* 
  arguments: 
  - headerList: list of headers
  - contents: list of objects, each object will contain the appropriate data correspond to the header
  - links: list of link used for forwarding to suitable path
 */
}
const HospitalTable = ({ headerList, contents, links }) => {
  return (
    <div className='mt-2'>
      {contents.length === 0 ? (
        <h1 className='text-center'>No results found.</h1>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-gray-300'>
              {headerList.map((ele, idx) => (
                <TableHead
                  key={idx}
                  className='font-semibold text-lg text-primary'
                >
                  {ele}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {contents.map((ele, idx) => (
              <TableRow className='hover:bg-gray-200' key={idx}>
                {ele.map((info, idx) => (
                  <TableCell key={idx}>{info}</TableCell>
                ))}
                <TableCell className='flex justify-end'>
                  <Link
                    href={links[idx]}
                    className='flex items-center gap-2 bg-primary text-white font-semibold px-2 py-1 rounded-full'
                  >
                    Detail
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='1em'
                      viewBox='0 0 448 512'
                    >
                      <path
                        fill='white'
                        d='M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z'
                      />
                    </svg>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default HospitalTable
