package com.posco.ocrservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QOcrEntity is a Querydsl query type for OcrEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOcrEntity extends EntityPathBase<OcrEntity> {

    private static final long serialVersionUID = 1864303378L;

    public static final QOcrEntity ocrEntity = new QOcrEntity("ocrEntity");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final StringPath createdBy = _super.createdBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final StringPath lastUpdatedBy = _super.lastUpdatedBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUpdatedDate = _super.lastUpdatedDate;

    public final NumberPath<Long> ocrId = createNumber("ocrId", Long.class);

    public final StringPath purDate = createString("purDate");

    public final StringPath storeName = createString("storeName");

    public final NumberPath<Double> totalVal = createNumber("totalVal", Double.class);

    public QOcrEntity(String variable) {
        super(OcrEntity.class, forVariable(variable));
    }

    public QOcrEntity(Path<? extends OcrEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QOcrEntity(PathMetadata metadata) {
        super(OcrEntity.class, metadata);
    }

}

