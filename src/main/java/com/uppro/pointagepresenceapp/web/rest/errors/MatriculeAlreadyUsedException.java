package com.uppro.pointagepresenceapp.web.rest.errors;

@SuppressWarnings("java:S110") // Inheritance tree of classes should not be too deep
public class MatriculeAlreadyUsedException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public MatriculeAlreadyUsedException() {
        super(ErrorConstants.EMAIL_ALREADY_USED_TYPE, "Matricule is already in use!", "userManagement", "matriculeexists");
    }
}
