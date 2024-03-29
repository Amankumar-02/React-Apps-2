import React from "react";
import {Container, Logo, LogoutBtn, CommonBtn} from '../index'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
// forcefully navigation
import { useNavigate } from "react-router-dom";

function Header(){
    const authStatus = useSelector((state) => state.status)
    const navigate = useNavigate();

    // to improve production grade projects use links in array
    const navItems = [
      {
        name: "Home",
        slug: "/",
        active: true,
      },
      {
        name: "Login",
        slug: "/login",
        active: !authStatus,
      },
      {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
      },
      {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
      },
      {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
      },
    ];
    return (
      <>
        <header className="py-3 shadow bg-gray-500">
          <Container>
            <nav className="flex">
              <div className="mr-4">
                <Link to="/">
                  <Logo width="40px" />
                </Link>
              </div>
              <ul className="flex ml-auto">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      {/* <button
                        onClick={() => navigate(item.slug)}
                        className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                      >
                        {item.name}
                      </button> */}

                      {/* here, i define a commonBtn */}
                      <CommonBtn
                        onClick={() => navigate(item.slug)}
                        children={item.name}
                      />
                    </li>
                  ) : null
                )}
                {/* another js */}
                {/* if authStatus is true then next code is execute just like ternery operation */}
                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </nav>
          </Container>
        </header>
      </>
    );
}

export default Header