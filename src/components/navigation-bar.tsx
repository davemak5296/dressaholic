import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_OUT_START } from '../store/user/user.reducer';
import { selectCurrentUser } from '../store/user/user.selector';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/letter-d.svg';
import { ReactComponent as MenuIcon } from '../assets/icon-menu.svg';
import { ReactComponent as ShoppingBag } from '../assets/icon-shopping-bag.svg';
import { getCurrentUser, signOutUser } from '../utils/firebase/firebase.utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type NavBarProps = {
  scrollY: number;
};

const Navigation: React.FC<NavBarProps> = (props) => {
  // const dispatch = useDispatch();
  // const currUser = useSelector(selectCurrentUser);
  const queryClient = useQueryClient();
  const { data, refetch } = useQuery(['user'], getCurrentUser);

  const { scrollY } = props;
  const isScrolledOver = scrollY > 36;

  const signOutHandler: React.MouseEventHandler = async () => {
    // dispatch(SIGN_OUT_START());
    await signOutUser();
    refetch();
  };

  return (
    <div className="relative z-10">
      {/* <nav className="fixed top-0 left-0 right-0 bg-base-200 md:flex md:justify-between"> */}
      {/* <nav className="bg-base-200 md:flex md:justify-between"> */}
      <nav
        className={`${
          isScrolledOver ? 'h-auto' : 'h-auto'
        } fixed left-0 top-0 right-0 bg-base-200 md:flex md:justify-between`}
      >
        <section className="flex items-center justify-between p-2 sm:ml-3 md:w-1/2 md:justify-start lg:p-3 xl:ml-5">
          <Link to="/">
            <Logo
              className={`${
                isScrolledOver ? 'hidden' : ''
              } h-[30px] w-[30px] sm:h-[48px] sm:w-[48px]`}
            />
          </Link>
          <div
            className={`${
              isScrolledOver ? 'text-sm lg:text-lg' : 'text-lg sm:text-2xl md:pl-3 lg:text-[28px]'
            } font-bold text-primary`}
          >
            <Link to="/">Dressaholic</Link>
          </div>
          <MenuIcon className="mr-3 h-[20px] w-[20px] md:hidden" />
        </section>
        <section
          className={`${
            isScrolledOver ? 'hidden' : 'md:flex'
          } hidden md:w-1/2 md:items-center md:justify-around xl:w-1/3`}
        >
          <div className="daisy-dropdown-hover daisy-dropdown">
            <Link to="/shop">
              <label
                tabIndex={0}
                className="daisy-rounded-btn daisy-btn daisy-btn-ghost text-base text-primary hover:daisy-btn-primary"
              >
                Shop
              </label>
            </Link>
            <div className="daisy-dropdown-content daisy-menu">
              <ul tabIndex={0} className="rounded-box mt-4 w-52 bg-base-100 p-2 shadow">
                <li>
                  <a>Men</a>
                </li>
                <li>
                  <a>Women</a>
                </li>
              </ul>
            </div>
          </div>
          {data ? (
            // {currUser ? (
            <button
              onClick={signOutHandler}
              // onClick={signOutHandler}
              className="daisy-rounded-btn daisy-btn daisy-btn-ghost text-base text-warning-content hover:daisy-btn-warning hover:text-warning-content"
            >
              sign out
            </button>
          ) : (
            <Link
              to="/auth"
              className="daisy-rounded-btn daisy-btn daisy-btn-ghost text-base text-info-content hover:daisy-btn-info hover:text-info-content"
            >
              sign in
            </Link>
          )}
          <ShoppingBag className="h-6 w-6" />
        </section>
      </nav>
    </div>
  );
};

export default Navigation;
