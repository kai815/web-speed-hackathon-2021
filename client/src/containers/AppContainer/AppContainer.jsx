import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { AuthModalContainer } from '../AuthModalContainer';
import { NewPostModalContainer } from '../NewPostModalContainer';

const TimelineContainer = React.lazy(() => import('../TimelineContainer'))
const UserProfileContainer = React.lazy(() => import('../UserProfileContainer'))
const PostContainer = React.lazy(() => import('../PostContainer'))
const TermContainer = React.lazy(() => import('../TermContainer'))
const NotFoundContainer = React.lazy(() => import('../NotFoundContainer'))

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = React.useState(null);
  const { data, isLoading } = useFetch('/api/v1/me', fetchJSON);
  React.useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = React.useState('none');
  const handleRequestOpenAuthModal = React.useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = React.useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = React.useCallback(() => setModalType('none'), []);

  if (isLoading) {
    return (
      <Helmet>
        <title>読込中 - CAwitter</title>
      </Helmet>
    );
  }

  return (
    <>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <Routes>
          <React.Fragment>
              <Route element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <TimelineContainer />
                </React.Suspense>
              } path="/" />
              <Route element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <UserProfileContainer />
                </React.Suspense>
              } path="/users/:username" />
              <Route element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <PostContainer />
                </React.Suspense>
              } path="/posts/:postId" />
              <Route element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <TermContainer />
                </React.Suspense>
              } path="/terms" />
              <Route element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <NotFoundContainer />
                </React.Suspense>
              } path="*" />
            
          </React.Fragment>
        </Routes>
      </AppPage>

      {modalType === 'auth' ? (
        <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
      ) : null}
      {modalType === 'post' ? <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /> : null}
    </>
  );
};

export { AppContainer };
