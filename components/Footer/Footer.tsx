// 'use client';
import CurrentYear from '../CurrentYear/CurrentYear';
import css from './Footer.module.css';
import { Suspense } from 'react';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>
          ©{' '}
          <Suspense fallback={null}>
            <CurrentYear />
          </Suspense>{' '}
          NoteHub. All rights reserved.
        </p>
        <div className={css.wrap}>
          <p>Developer: your name</p>
          <p>
            Contact us:
            <a href="mailto:student@notehub.app">student@notehub.app</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
