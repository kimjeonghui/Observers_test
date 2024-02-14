package com.posco.summaryservice.entity;

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

    private static final long serialVersionUID = 236827580L;

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

    public final NumberPath<Long> deptReqFlag = createNumber("deptReqFlag", Long.class);

    public final StringPath description = createString("description");

    //inherited
    public final StringPath lastModifiedBy = _super.lastModifiedBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUpdatedDate = _super.lastUpdatedDate;

    public final StringPath majorCt = createString("majorCt");

    public final StringPath mediumCt = createString("mediumCt");

    public final StringPath minorCt = createString("minorCt");

    public final StringPath ovsCd = createString("ovsCd");

    public final NumberPath<Long> subAccount = createNumber("subAccount", Long.class);

    public final ListPath<SummaryContentsEntity, QSummaryContentsEntity> summaryContentsEntities = this.<SummaryContentsEntity, QSummaryContentsEntity>createList("summaryContentsEntities", SummaryContentsEntity.class, QSummaryContentsEntity.class, PathInits.DIRECT2);

    public final StringPath tranCd = createString("tranCd");

    public QGLCodeEntity(String variable) {
        super(GLCodeEntity.class, forVariable(variable));
    }

    public QGLCodeEntity(Path<? extends GLCodeEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGLCodeEntity(PathMetadata metadata) {
        super(GLCodeEntity.class, metadata);
    }

}

