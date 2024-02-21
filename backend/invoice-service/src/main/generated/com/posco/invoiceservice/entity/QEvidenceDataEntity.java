package com.posco.invoiceservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEvidenceDataEntity is a Querydsl query type for EvidenceDataEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEvidenceDataEntity extends EntityPathBase<EvidenceDataEntity> {

    private static final long serialVersionUID = 1888988555L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEvidenceDataEntity evidenceDataEntity = new QEvidenceDataEntity("evidenceDataEntity");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final StringPath createdBy = _super.createdBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath evidenceDir = createString("evidenceDir");

    public final NumberPath<Long> evidenceId = createNumber("evidenceId", Long.class);

    public final QInvoiceDataEntity invoiceDataEntity;

    public final NumberPath<Long> invoiceDataId = createNumber("invoiceDataId", Long.class);

    //inherited
    public final StringPath lastModifiedBy = _super.lastModifiedBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUpdatedDate = _super.lastUpdatedDate;

    public QEvidenceDataEntity(String variable) {
        this(EvidenceDataEntity.class, forVariable(variable), INITS);
    }

    public QEvidenceDataEntity(Path<? extends EvidenceDataEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEvidenceDataEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEvidenceDataEntity(PathMetadata metadata, PathInits inits) {
        this(EvidenceDataEntity.class, metadata, inits);
    }

    public QEvidenceDataEntity(Class<? extends EvidenceDataEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.invoiceDataEntity = inits.isInitialized("invoiceDataEntity") ? new QInvoiceDataEntity(forProperty("invoiceDataEntity")) : null;
    }

}

