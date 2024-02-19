package com.posco.referenceservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReferenceEntity is a Querydsl query type for ReferenceEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReferenceEntity extends EntityPathBase<ReferenceEntity> {

    private static final long serialVersionUID = -1405047700L;

    public static final QReferenceEntity referenceEntity = new QReferenceEntity("referenceEntity");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final ListPath<GLCodeEntity, QGLCodeEntity> codeEntityList = this.<GLCodeEntity, QGLCodeEntity>createList("codeEntityList", GLCodeEntity.class, QGLCodeEntity.class, PathInits.DIRECT2);

    //inherited
    public final StringPath createdBy = _super.createdBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final DatePath<java.time.LocalDate> endDate = createDate("endDate", java.time.LocalDate.class);

    public final StringPath glCurr = createString("glCurr");

    //inherited
    public final StringPath lastUpdatedBy = _super.lastUpdatedBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUpdatedDate = _super.lastUpdatedDate;

    public final StringPath locCurr = createString("locCurr");

    public final StringPath locCurr2 = createString("locCurr2");

    public final StringPath ovsCd = createString("ovsCd");

    public final StringPath ovsCopCd = createString("ovsCopCd");

    public final StringPath ovsMeaning = createString("ovsMeaning");

    public final DatePath<java.time.LocalDate> startDate = createDate("startDate", java.time.LocalDate.class);

    public final StringPath transCurr = createString("transCurr");

    public final StringPath transCurr2 = createString("transCurr2");

    public QReferenceEntity(String variable) {
        super(ReferenceEntity.class, forVariable(variable));
    }

    public QReferenceEntity(Path<? extends ReferenceEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QReferenceEntity(PathMetadata metadata) {
        super(ReferenceEntity.class, metadata);
    }

}

