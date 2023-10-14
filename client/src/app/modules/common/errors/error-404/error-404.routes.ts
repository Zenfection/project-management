import { Routes } from '@angular/router';
import { Error404Component } from 'app/modules/common/errors/error-404/error-404.component';

export default [
    {
        path     : '',
        component: Error404Component,
    },
] as Routes;
