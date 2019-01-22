
export const EMPTY_MODEL = {
    id: null,
    name: '',
    city: '',
    state: '',
    zip_code: '',
    created_at: '',
    updated_at: '',
};

export const INPUT_CONFIG = {
    id: {
        id: 'id',
        label: 'ID',
    },
    name: {
        id: 'name',
        label: 'Name',
    },
    city: {
        id: 'city',
        label: 'City',
    },
    state: {
        id: 'state',
        label: 'State',
    },
    zip_code: {
        id: 'zip_code',
        label: 'Zip Code',
    },
    created_at: {
        id: 'created_at',
        label: 'Created',
    },
    updated_at: {
        id: 'updated_at',
        label: 'updated',
    },
};

export const EMPTY_VALIDATION = {
    id: {
        required: false,
    },
    name: {
        required: true,
    },
    city: {
        required: true,
    },
    state: {
        required: true,
    },
    zip_code: {
        required: true,
    },
    created_at: {
        required: false,
    },
    updated_at: {
        required: false,
    },
};
