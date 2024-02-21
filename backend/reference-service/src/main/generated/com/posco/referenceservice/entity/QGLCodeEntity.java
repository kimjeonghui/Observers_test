package com.posco.referenceservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGLCodeEntity is a Querydsl query type for GLCodeEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGLCodeEntity extends EntityPathBase<GLCodeEntity> {

    private static final long serialVersionUID = 1399798327L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGLCodeEntity gLCodeEntity = new QGLCodeEntity("gLCodeEntity");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final NumberPath<Long> account = createNumber("account", Long.class);

    public final StringPath accountName = createString("accountName");

    public final StringPath additionalComment = createString("additionalComment");

    //inherited
    public final StringPath createdBy = _super.createdBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> depositCd = createNumber("depositCd", Long.class);

    public final StringPath deptReqFlag = createString("deptReqFlag");

    public final StringPath description = createString("description");

    public final NumberPath<Long> glCodeId = createNumber("glCodeId", Long.class);

    //inherited
    public final StringPath lastUpdatedBy = _super.lastUpdatedBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUpdatedDate = _super.lastUpdatedDate;

    public final StringPath majorCt = createString("majorCt");

    public final StringPath mediumCt = createString("mediumCt");

    public final StringPath minorCt = createString("minorCt");

    public final StringPath ovsCd = createString("ovsCd");

    public final QReferenceEntity referenceEntity;

    public final NumberPath<Long> subAccount = createNumber("subAccount", Long.class);

    public final StringPath tranCd = createString("tranCd");

    public QGLCodeEntity(String variable) {
        this(GLCodeEntity.class, forVariable(variable), INITS);
    }

    public QGLCodeEntity(Path<? extends GLCodeEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGLCodeEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGLCodeEntity(PathMetadata metadata, PathInits inits) {
        this(GLCodeEntity.class, metadata, inits);
    }

    public QGLCodeEntity(Class<? extends GLCodeEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.referenceEntity = inits.isInitialized("referenceEntity") ? new QReferenceEntity(forProperty("referenceEntity")) : null;
    }

}

