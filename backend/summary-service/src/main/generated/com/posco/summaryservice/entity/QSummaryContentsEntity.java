package com.posco.summaryservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSummaryContentsEntity is a Querydsl query type for SummaryContentsEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSummaryContentsEntity extends EntityPathBase<SummaryContentsEntity> {

    private static final long serialVersionUID = 1765341148L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSummaryContentsEntity summaryContentsEntity = new QSummaryContentsEntity("summaryContentsEntity");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final StringPath createdBy = _super.createdBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final QGLCodeEntity glCodeEntity;

    //inherited
    public final StringPath lastModifiedBy = _super.lastModifiedBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUpdatedDate = _super.lastUpdatedDate;

    public final NumberPath<java.math.BigDecimal> loc = createNumber("loc", java.math.BigDecimal.class);

    public final StringPath locCurr = createString("locCurr");

    public final StringPath majorCt = createString("majorCt");

    public final StringPath mediumCt = createString("mediumCt");

    public final StringPath minorCt = createString("minorCt");

    public final StringPath note = createString("note");

    public final NumberPath<Long> summaryContentId = createNumber("summaryContentId", Long.class);

    public final QSummaryEntity summaryEntity;

    public final NumberPath<Long> summaryId = createNumber("summaryId", Long.class);

    public final StringPath tranCd = createString("tranCd");

    public final NumberPath<java.math.BigDecimal> trans = createNumber("trans", java.math.BigDecimal.class);

    public final StringPath transCurr = createString("transCurr");

    public QSummaryContentsEntity(String variable) {
        this(SummaryContentsEntity.class, forVariable(variable), INITS);
    }

    public QSummaryContentsEntity(Path<? extends SummaryContentsEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSummaryContentsEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSummaryContentsEntity(PathMetadata metadata, PathInits inits) {
        this(SummaryContentsEntity.class, metadata, inits);
    }

    public QSummaryContentsEntity(Class<? extends SummaryContentsEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.glCodeEntity = inits.isInitialized("glCodeEntity") ? new QGLCodeEntity(forProperty("glCodeEntity"), inits.get("glCodeEntity")) : null;
        this.summaryEntity = inits.isInitialized("summaryEntity") ? new QSummaryEntity(forProperty("summaryEntity")) : null;
    }

}

