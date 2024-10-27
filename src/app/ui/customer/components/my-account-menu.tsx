'use client';
import Dropdown from 'react-bootstrap/Dropdown';
import Link from 'next/link';

export default function MyAccount() {
    return (
        <Dropdown className='ml-7' >
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                My Account
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Link href="/dashboard"><Dropdown.Item as="div">
                    Dashboard
                </Dropdown.Item></Link>
                <Dropdown.Item as="button">Signout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
