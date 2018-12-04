define({ "api": [  {    "type": "post",    "url": "/login",    "title": "Log a User In",    "name": "PostLogin",    "group": "Auth",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>The user's email.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>The user's password.</p>"          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "{\n  \"email\": \"example@email.com\",\n  \"password\": \"userpassword123\",\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>The jwt token necessary for authentication</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0\",\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "NotFound",            "description": "<p>The <code>email</code> of the User was not found.</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "BadRequest",            "description": "<p>Either a required field was not provided or <code>email<code> is not unique</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"type\": \"BadRequest\",\n  \"error\": \"Error message\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "source/api/auth/AuthRoutes.js",    "groupTitle": "Auth"  },  {    "type": "post",    "url": "/register",    "title": "Register a User",    "name": "PostRegister",    "group": "Auth",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>The user's email.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>The user's password.</p>"          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "{\n  \"email\": \"example@email.com\",\n  \"password\": \"userpassword123\",\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>the jwt token necessary for authentication</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0\",\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "BadRequest",            "description": "<p>Either a required field was not provided or the email is not unique</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"type\": \"BadRequest\",\n  \"error\": \"Error message\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "source/api/auth/AuthRoutes.js",    "groupTitle": "Auth"  },  {    "type": "post",    "url": "/contacts",    "title": "Add a Contact to the Address Book",    "name": "PostContact",    "group": "Contact",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "jwt-token",            "description": "<p>Users unique access-key.</p>"          }        ]      },      "examples": [        {          "title": "Header-Example:",          "content": "{\n  \"Authorization\": \"Bearer eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0\"\n}",          "type": "json"        }      ]    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "firstName",            "description": "<p>The contact's first name.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "lastName",            "description": "<p>The contact's last name.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>The contact's email.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "phoneNumber",            "description": "<p>The contact's phone number.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "ref",            "description": "<p>The firebase document reference for the added contact</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"ref\": \"LSoA0PfAL8VhKRyP4fe\"\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "BadRequest",            "description": "<p>A required field was not provided</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"type\": \"BadRequest\",\n  \"error\": \"Error message\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "source/api/addressBook/ContactRoutes.js",    "groupTitle": "Contact"  }] });
