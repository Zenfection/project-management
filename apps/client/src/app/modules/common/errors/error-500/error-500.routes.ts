import { Routes } from '@angular/router';
import { Error500Component } from 'app/modules/common/errors/error-500/error-500.component';

export default [
    {
        path     : '',
        component: Error500Component,
    },
] as Routes;
